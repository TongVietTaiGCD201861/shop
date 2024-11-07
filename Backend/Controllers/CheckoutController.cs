using Microsoft.AspNetCore.Mvc;
using System.Text;
using System.Text.Json.Nodes;

namespace BackEnd.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CheckoutController : Controller
{
    private string PaypalClientId { get; set; } = "";
    private string PaypalSecret { get; set; } = "";
    private string PaypalUrl { get; set; } = "";

    public CheckoutController(IConfiguration configuration)
    {
        PaypalClientId = configuration["PayPalSettings:ClientId"]!;
        PaypalSecret = configuration["PayPalSettings:Secret"]!;
        PaypalUrl = configuration["PayPalSettings:Url"]!;
    }

    [HttpGet("getIndex")]
    public async Task<string> Index()
    {
        return PaypalClientId;
    }

    [HttpPost("getToken")]
    public async Task<string> Token()
    {
        return await GetPaypalAccessToken();
    }

    [HttpPost("getPaypalAccessToken")]
    public async Task<string> GetPaypalAccessToken()
    {
        string accessToken = "";
        string url = PaypalUrl + "/v1/oauth2/token";

        using (var client = new HttpClient())
        {
            string credentials = Convert.ToBase64String(Encoding.UTF8.GetBytes(PaypalClientId + ":" + PaypalSecret));
            client.DefaultRequestHeaders.Add("Authorization", "Basic " + credentials);
            var request = new HttpRequestMessage(HttpMethod.Post, url);
            request.Content = new StringContent("grant_type=client_credentials", Encoding.UTF8, "application/x-www-form-urlencoded");

            var httpResponse = await client.SendAsync(request);
            if (httpResponse.IsSuccessStatusCode)
            {
                var responseContent = await httpResponse.Content.ReadAsStringAsync();
                var json = System.Text.Json.JsonDocument.Parse(responseContent);
                accessToken = json.RootElement.GetProperty("access_token").GetString();
            }
            else
            {
                throw new Exception("Failed to retrieve access token from PayPal.");
            }
        }

        return accessToken;
    }

    [HttpPost("createOrder")]
    public async Task<JsonResult> CreateOrder([FromBody] JsonObject data)
    {
        var cart = data?["cart"]?[0];
        var total = cart?["total"]?.ToString();
        var cardId = cart?["id"]?.ToString();

        if (total == null)
        {
            return new JsonResult(new { Id = "" });
        }

        JsonObject createOrderRequest = new JsonObject();
        createOrderRequest.Add("intent", "CAPTURE");

        JsonObject amount = new JsonObject();
        amount.Add("currency_code", "USD");
        amount.Add("value", total);

        JsonObject purchaseUnit1 = new JsonObject(); 
        purchaseUnit1.Add("amount", amount);

        JsonArray purchaseUnits = new JsonArray(); 
        purchaseUnits.Add(purchaseUnit1);

        createOrderRequest.Add("purchase_units", purchaseUnits);

        string accessToken = await GetPaypalAccessToken();

        string url = PaypalUrl + "/v2/checkout/orders";

        using (var client = new HttpClient())
        {
            client.DefaultRequestHeaders.Add("Authorization", "Bearer " + accessToken); 
            var request = new HttpRequestMessage(HttpMethod.Post, url);
            request.Content = new StringContent(createOrderRequest.ToString(), Encoding.UTF8, "application/json"); 

            var httpResponse = await client.SendAsync(request);

            if (httpResponse.IsSuccessStatusCode)
            {
                var strResponse = await httpResponse.Content.ReadAsStringAsync();
                var jsonResponse = JsonNode.Parse(strResponse);

                if (jsonResponse != null)
                {
                    string paypalOrderId = jsonResponse["id"]?.ToString() ?? "";
                    return new JsonResult(new { Id = paypalOrderId });
                }
            }
        }

        return new JsonResult(new { Id = "" });
    }

    [HttpPost("completeOrder")]
    public async Task<JsonResult> CompleteOrder([FromBody] JsonObject data)
    {
        var orderId = data?["orderId"]?.ToString();
        if (orderId == null)
        {
            return new JsonResult("error");
        }

        string accessToken = await GetPaypalAccessToken();
        string url = $"{PaypalUrl}/v2/checkout/orders/{orderId}/capture"; 

        using (var client = new HttpClient())
        {
            client.DefaultRequestHeaders.Add("Authorization", "Bearer " + accessToken);
            var request = new HttpRequestMessage(HttpMethod.Post, url);
            request.Content = new StringContent("{}", Encoding.UTF8, "application/json"); 

            var httpResponse = await client.SendAsync(request);

            if (httpResponse.IsSuccessStatusCode)
            {
                var strResponse = await httpResponse.Content.ReadAsStringAsync();
                var jsonResponse = JsonNode.Parse(strResponse);

                if (jsonResponse != null)
                {
                    string paypalOrderStatus = jsonResponse["status"]?.ToString() ?? "";
                    if (paypalOrderStatus == "COMPLETED") 
                    {
                        return new JsonResult("success");
                    }
                }
            }
        }

        return new JsonResult("error");
    }
}


using AutoMapper;
using BackEnd.Attributes;
using BackEnd.Dtos;
using BackEnd.Models;
using BackEnd.Services;
using BackEnd.Services.IServices;
using Microsoft.AspNetCore.Mvc;

namespace BackEnd.Controllers
{
    
    [ApiController]
    [Route("api/[controller]")]

    public class PurchasesController : ControllerBase
    {
        private IPurchaseService _purchaseService;
        private readonly IMapper _mapper;

        public PurchasesController(IPurchaseService purchaseService, IMapper mapper)
        {
            _purchaseService = purchaseService;
            _mapper = mapper;
        }

        [HttpPost("create")]
        public IActionResult Create(PurchaseDto input)
        {
            if (input == null)
            {
                return BadRequest("PurchaseDto input is null");
            }
                
            var purchase = new Purchase
            {
                Name = input.Name,
                Size = input.Size,
                Price = input.Price,
                Quantity = input.Quantity,
                Total = input.Total,
                UserName = input.UserName,
                Address = input.Address,
                PhoneNumber = input.PhoneNumber,
                PaymentMethod = input.PaymentMethod,
                AccountBuy = input.AccountBuy,
            };

            _purchaseService.Create(purchase);

            return Ok(purchase);
        }

        
        [HttpPost]
        public IActionResult Create(List<PurchaseDto> inputs)
        {
            if (inputs == null || !inputs.Any())
            {
                return BadRequest("No purchases provided");
            }

            var purchases = new List<Purchase>();
            foreach (var input in inputs)
            {
                var purchase = new Purchase
                {
                    Name = input.Name,
                    Size = input.Size,
                    Price = input.Price,
                    Quantity = input.Quantity,
                    Total = input.Total,
                    UserName = input.UserName,
                    Address = input.Address,
                    PhoneNumber = input.PhoneNumber,
                    PaymentMethod = input.PaymentMethod,
                    AccountBuy = input.AccountBuy,
                };
                purchases.Add(purchase);
            }

            _purchaseService.CreatePurchase(purchases);

            return Ok(purchases);
        }



    }
}

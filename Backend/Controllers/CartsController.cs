using BackEnd.Attributes;
using BackEnd.Dtos;
using BackEnd.Models;
using BackEnd.Services.IServices;
using Microsoft.AspNetCore.Mvc;

namespace BackEnd.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class CartsController : ControllerBase
{
    private ICartService _cartService;

    public CartsController(ICartService cartService)
    {
        _cartService = cartService;
    }

    [HttpGet("{userId:int}")]
    public IActionResult GetCart(int userId)
    {
        try
        {
            var cart = _cartService.GetCart(userId);
            return Ok(cart);
        }
        catch (ArgumentException ex)
        {
            return NotFound(ex.Message);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }

    [HttpPost("{userId:int}/items")]
    public IActionResult AddItemToCart([FromRoute] int userId, [FromBody] AddItemToCartRequest request)
    {
        try
        {
            _cartService.AddItemToCart(userId, request.ShirtId, request.Quantity, request.Color);
            return Ok();
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }

    [HttpDelete("delete/{userId:int}/items/{shirtId:int}")]
    public IActionResult RemoveItemFromCart([FromRoute] int userId, [FromRoute] int shirtId)
    {
        try
        {
            _cartService.RemoveItemFromCart(userId, shirtId);
            return Ok();
        }
        catch (ArgumentException ex)
        {
            return NotFound(ex.Message);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }

    [HttpPut("update-quantity/{cartItemId:int}/{newQuantity:int}")]
    public async Task<IActionResult> UpdateQuantity([FromRoute] int cartItemId, [FromRoute] int newQuantity)
    {
        var result = await _cartService.UpdateCartItemQuantityAsync(cartItemId, newQuantity);

        if (!result)
        {
            return NotFound("Cart item not found.");
        }

        return Ok("Quantity updated successfully.");
    }
}

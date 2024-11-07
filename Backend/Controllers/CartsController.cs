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

    [HttpGet("getAll")]
    public IActionResult GetAllCarts()
    {
        try
        {
            var carts = _cartService.GetAllCarts();
            return Ok(carts);
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

    [HttpPost("delete/{userId:int}/items")]
    public IActionResult RemoveItemFromCart([FromRoute] int userId, [FromBody] AddItemToCartRequest request)
    {
        try
        {
            _cartService.RemoveItemFromCart(userId, request.ShirtId, request.Quantity);
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
}

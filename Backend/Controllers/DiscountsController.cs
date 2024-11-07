using BackEnd.Attributes;
using BackEnd.Dtos;
using BackEnd.Models;
using BackEnd.Services.IServices;
using Microsoft.AspNetCore.Mvc;

namespace BackEnd.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class DiscountsController : ControllerBase
{
    private IDiscountService _discountService;

    public DiscountsController(IDiscountService discountService)
    {
        _discountService = discountService;
    }

    [HttpPost("add")]
    public async Task<IActionResult> AddDiscount([FromBody] Discount discount)
    {
        var (discount1, error) = await _discountService.AddDiscountAsync(discount);
        if (!string.IsNullOrEmpty(error))
        {
            return BadRequest(new { message = error });
        }
        return Ok(discount1);
    }

    [HttpPost("update")]
    public async Task<IActionResult> UpdateDiscount([FromBody] DiscountDto discountDto)
    {
        var (discount, error) = await _discountService.UpdateDiscountAsync(discountDto);
        if (!string.IsNullOrEmpty(error))
        {
            return BadRequest(new { message = error });
        }
        return Ok(discount);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetDiscount(int id)
    {
        var discount = await _discountService.GetDiscountByIdAsync(id);
        if (discount == null)
        {
            return NotFound();
        }
        return Ok(discount);
    }

    [HttpGet("getAllDiscount")]
    public async Task<IActionResult> GetAllDiscounts()
    {
        var discounts = await _discountService.GetAllDiscountsAsync();
        return Ok(discounts);
    }


    [HttpPost("delete/{id}")]
    public async Task<IActionResult> DeleteDiscount(int id)
    {
        var (success, error) = await _discountService.DeleteDiscountAsync(id);
        if (!success)
        {
            return BadRequest(new { message = error });
        }
        return Ok(new { message = "Discount deleted successfully." });
    }

    [HttpGet("code/{code}")]
    public async Task<IActionResult> GetDiscountByCode(string code)
    {
        var discount = await _discountService.GetDiscountByCodeAsync(code);
        if (discount == null)
        {
            return NotFound();
        }
        return Ok(discount);
    }
}

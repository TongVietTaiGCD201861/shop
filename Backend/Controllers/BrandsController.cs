using BackEnd.Attributes;
using BackEnd.Dtos;
using BackEnd.Models;
using BackEnd.Services;
using BackEnd.Services.IServices;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BackEnd.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class BrandsController : ControllerBase
{
    private IBrandService _brandService;

    public BrandsController(IBrandService brandService)
    {
        _brandService = brandService;
    }

    [HttpGet("getAllBrands")]
    public async Task<IActionResult> GetBrands()
    {
        try
        {
            var brands = await _brandService.GetAllBrandsAsync();
            return Ok(brands);
        }
        catch (ApplicationException ex)
        {
            return StatusCode(500, ex.Message);
        }
        catch (Exception ex)
        {
            return StatusCode(500, "An unexpected error occurred.");
        }
    }

    [HttpGet("getByBrandId/{brandId:int}")]
    public async Task<IList<Tuple<Shirt, IList<Image>>>> GetAll([FromRoute] int brandId)
    {
            return _brandService.getByBrandId(brandId);
    }
}

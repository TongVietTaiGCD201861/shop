using BackEnd.Attributes;
using BackEnd.Dtos;
using BackEnd.Models;
using BackEnd.Services.IServices;
using Microsoft.AspNetCore.Mvc;

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
    public async Task<IActionResult> GetBrands([FromQuery] BranDto branDto)
    {
        try
        {
            var brands = await _brandService.GetAllBrandsAsync(branDto);
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



    [Authorize(Role.Admin)]
    [HttpPost("createBrand")]
    public async Task<IActionResult> AddBrand(Brand brand)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var brands = await _brandService.AddBrandAsync(brand);
        return Ok(brands);
    }

    [Authorize(Role.Admin)]
    [HttpPut("updateBrand/{id:int}")]
    public async Task<IActionResult> UpdateBrand(int id, Brand brand)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var brand1 = await _brandService.UpdateBrandAsync(brand, id);
        return Ok(brand1); 
    }

    [Authorize(Role.Admin)]
    [HttpDelete("{id:int}")]
    public async Task<IActionResult> DeleteBrand(int id)
    {
        var result = await _brandService.DeleteBrandAsync(id);

        if (!result)
        {
            return NotFound(); 
        }

        return Ok(); 
    }

    [Authorize(Role.Admin)]
    [HttpPut("updateStatus/{id:int}/{operatingStatus:int}")]
    public async Task<IActionResult> updateStatus(int id, int operatingStatus)
    {
        var brand1 = await _brandService.updateStatus(id, operatingStatus);
        return Ok(brand1);
    }
}

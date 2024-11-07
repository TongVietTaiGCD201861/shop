using AutoMapper;
using BackEnd.Attributes;
using BackEnd.Dtos;
using BackEnd.Models;
using BackEnd.Services.IServices;
using Microsoft.AspNetCore.Mvc;
using Image = BackEnd.Models.Image;

namespace BackEnd.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ShirtsController : ControllerBase
    {
        private IShirtService _shirtService;
        private readonly IMapper _mapper;
        private readonly IUserService _userService;
        private readonly IEmailService _emailService;

        public ShirtsController(
            IShirtService shirtService,
            IMapper mapper, 
            IEmailService emailService,
            IUserService userService)
        {
            _shirtService = shirtService;
            _mapper = mapper;
            _emailService= emailService;
            _userService = userService;
        }

        [HttpGet("search")]
        public async Task<IList<Tuple<Shirt, IList<Image>>>> GetAll([FromQuery] SearchDto searchDto)
        {
            return _shirtService.GetAllShirtsAndImages(
                searchDto.SearchItem,
                searchDto.BrandId,
                searchDto.MinPrice, 
                searchDto.MaxPrice);
        }

        [HttpGet("{id:int}")]
        public async Task<Tuple<Shirt, IList<Image>>> GetById([FromRoute] int id)
        {
           
            try
            {
                return  _shirtService.GetById(id);
            }
            catch (ArgumentException ex)
            {
                return Tuple.Create<Shirt, IList<Image>>(null, null);
            }
            catch (Exception ex)
            {
                return Tuple.Create<Shirt, IList<Image>>(null, null);
            }
        }

        [HttpDelete("{id:int}")]
        [Authorize(Role.Admin)]
        public IActionResult Delete(int id)
        {
            var result = _shirtService.Delete(id);
            if (!result)
            {
                return BadRequest();
            }

            return Ok();
        }

        [HttpPost]
        //[Authorize(Role.Admin)]
        public IActionResult Create(ShirtUpsertDto input)
        {
            var shirt = _mapper.Map<Shirt>(input);
            _shirtService.Create(shirt);
            return Ok(shirt);
        }

        [HttpPut("{id:int}")]
        [Authorize(Role.Admin)]
        public IActionResult Update([FromRoute] int id, ShirtUpsertDto input)
        {
            var shirtTuple = _shirtService.GetById(id);
            var shirt = shirtTuple.Item1;
            var images = shirtTuple.Item2;
            _mapper.Map(input, shirt);
            _shirtService.Update(id,shirt, images);
            return Ok(shirt);
        }

        [HttpPost("{id:int}/upload-image")]
        [Authorize(Role.Admin)]
        public async Task<IActionResult> Upload(IFormFile file, [FromRoute] int id)
        {

            try
            {
                var imageUrl = await _shirtService.UploadImageAsync(file, id);
                return Ok("Upload file success. Image URL: " + imageUrl);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }

        }


        [HttpGet("getCountCart/{userId:int}")]
        public async Task<int> getCountCart([FromRoute] int userId)
        {
            try
            {
                return _shirtService.getCountCart(userId);
            } catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

    }
}

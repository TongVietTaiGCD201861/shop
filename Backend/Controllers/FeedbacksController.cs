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

    public class FeedbacksController : ControllerBase
    {
        private IFeedbackService _feedbackService;
        private readonly IMapper _mapper;

        public FeedbacksController(IFeedbackService feedbackService, IMapper mapper)
        {
            _feedbackService = feedbackService;
            _mapper = mapper;
        }

        [HttpPost]
        public IActionResult Create(FeedbackDto input)
        {
            if (input == null)
            {
                return BadRequest("FeedbackDto input is null");
            }
            
            var feedback = new Feedback
            {
                IdShirt = input.IdShirt,
                UserName = input.UserName,
                Description = input.Description,
                CreateDate = DateTime.Now
            };


        _feedbackService.Create(feedback);

            return Ok(feedback);
        }

        [HttpGet("search/{idShirt:int}")]
        public IActionResult GetAll(int idShirt)
        {
            var purchases = _feedbackService.GetByShirtId(idShirt);
            return Ok(purchases);
        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> DeleteBrand(int id)
        {
            var result = await _feedbackService.DeleteFeedback(id);

            if (!result)
            {
                return NotFound();
            }

            return Ok();
        }

    }
}

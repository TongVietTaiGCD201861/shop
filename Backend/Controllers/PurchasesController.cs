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

            [HttpPost]
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
                    Color = input.Color,
                    Quantity = input.Quantity,
                    Total = input.Total,
                    UserName = input.UserName,
                    Address = input.Address,
                    PhoneNumber = input.PhoneNumber,
                    PaymentMethod = input.PaymentMethod,
                    AccountBuy = input.AccountBuy,
                    Status = 1,
                };


            _purchaseService.Create(purchase);

                return Ok(purchase);
            }

        [HttpGet]
        [Authorize(Role.Admin)]
        public IActionResult GetAll()
        {
            var purchases = _purchaseService.GetAll();
            return Ok(purchases);
        }

        [HttpPost("update/{id:int}/{status:int}")]
        public ActionResult UpdatePurchaseStatus(int id, int status)
        {
            var success = _purchaseService.UpdatePurchaseStatus(id, status);
            if (success)
            {
                return Ok();
            }
            else
            {
                return NotFound(); 
            }
        }
    }
}

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BackEnd.Controllers;

    [Authorize]
    [ApiController]
    [Route("api/[controller]")]

public class AdminController : ControllerBase
{
       
}

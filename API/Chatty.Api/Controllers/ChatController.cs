using System.Threading.Tasks;
using Chatty.Api.Hubs;
using Chatty.Api.Hubs.Clients;
using Chatty.Api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;

namespace Chatty.Api.Controllers
{
  [ApiController]
  [Route("[controller]")]
  public class ChatController : ControllerBase
  {
    /* [HttpPost]
    public async Task<IActionResult> CreateRoom(string name)
    {
      await _repo.CreateRoom(name, GetUserId());
      return RedirectToAction("Index");
    } */
  }
}
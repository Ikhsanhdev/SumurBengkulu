using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using SumurBengkulu.Models;

namespace SumurBengkulu.Controllers;

public class PelaporanController : Controller
{
    private readonly ILogger<PelaporanController> _logger;

    public PelaporanController(ILogger<PelaporanController> logger)
    {
        _logger = logger;
    }

    public IActionResult Bencana()
    {
        return View();
    }

    public IActionResult Permohonan()
    {
        return View();
    }

    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult Error()
    {
        return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
    }
}

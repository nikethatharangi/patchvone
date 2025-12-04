using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    public class HomeController : Controller
    {
        private readonly ApplicationDbContext _dbcontext;

        public HomeController(ApplicationDbContext dbcontext)
        {
            _dbcontext = dbcontext;
        }

        public IActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public IActionResult ProductCollectionView()
        {
            ViewBag.ProductCollectionList = _dbcontext.Products.ToList();
            return View();
        }

        [HttpPost]
        public IActionResult ProductCollectionView(ProductCollection productCollection)
        {
            productCollection.CreatedDate = DateTime.Now;
            _dbcontext.ProductCollections.Add(productCollection);
            _dbcontext.SaveChanges();

            var collections = _dbcontext.ProductCollections.ToList();
            ViewBag.ProductCollectionList = new SelectList(collections, "CollectionId", "CollectionName");
            ModelState.Clear();

            return View();
        }

        [HttpGet]
        public IActionResult ProductView()
        {
            var collections = _dbcontext.ProductCollections.ToList();
            ViewBag.Collections = collections;

            ViewBag.ProductList = _dbcontext.Products.ToList();
            return View();
        }

        [HttpPost]
        public IActionResult ProductView(Product product, List<IFormFile> ImageFiles)
        {
            int productId = product.ProductId;

            string folder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "ProductImages");

            if (!Directory.Exists(folder))
                Directory.CreateDirectory(folder);

            foreach (var image in ImageFiles)
            {
                if (image != null && image.Length > 0)
                {
                    string fileName = Guid.NewGuid().ToString() + "_" + Path.GetFileName(image.FileName);

                    string filePath = Path.Combine(folder, fileName);

                    using (var stream = new FileStream(filePath, FileMode.Create))
                    {
                        image.CopyToAsync(stream);
                    }

                    ProductImage img = new ProductImage
                    {
                        ImageName = fileName,
                        ImagePath = "/ProductImages/" + fileName,
                        ProductId = productId
                    };

                    _dbcontext.ProductsImage.Add(img);
                }
            }

            product.CreatedDate = DateTime.Now;
            _dbcontext.Products.Add(product);
            _dbcontext.SaveChanges();

            var collections = _dbcontext.ProductCollections.ToList();
            ViewBag.Collections = collections;

            ViewBag.ProductList = _dbcontext.Products.ToList();

            ModelState.Clear();

            return View();
        }

        [HttpGet]
        public IActionResult BannerView()
        {
            ViewBag.Banners = _dbcontext.Banners.ToList();
            return View();
        }

        [HttpPost]
        public IActionResult BannerView(Banner banner, IFormFile BannerImage)
        {
            if (BannerImage == null || BannerImage.Length == 0)
            {
                ModelState.AddModelError("", "Please select an image.");
                return View();
            }

            var folderPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "Banners");

            if (!Directory.Exists(folderPath))
            {
                Directory.CreateDirectory(folderPath);
            }

            var fileName = Guid.NewGuid().ToString() + Path.GetExtension(BannerImage.FileName);
            var filePath = Path.Combine(folderPath, fileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                BannerImage.CopyTo(stream);   
            }

            banner.BannerName = fileName;
            banner.BannerPath = "/Banners/" + fileName;

            _dbcontext.Banners.Add(banner);
            _dbcontext.SaveChanges();

            //ViewBag.Banner = _dbcontext.Banners.ToList();

            ModelState.Clear();

            return View();
        }
        

        [HttpGet]
        public IActionResult CurrierView()
        {
            ViewBag.Courier = _dbcontext.Couriers.ToList();
            ViewBag.CollectionList = _dbcontext.ProductCollections.ToList();
            return View();
        }

        [HttpPost]
        public IActionResult CurrierView(Courier courier)
        {
            _dbcontext.Couriers.Add(courier);
            _dbcontext.SaveChanges();

            ViewBag.Courier = _dbcontext.Couriers.ToList();
            ModelState.Clear();

            return View();
        }
    }
}

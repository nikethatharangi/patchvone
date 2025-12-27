using System.Collections.ObjectModel;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using Microsoft.VisualBasic;

namespace backend.Controllers
{
    public class HomeController : Controller
    {
        private readonly ApplicationDbContext _dbcontext;
        public ApplicationDbContext _db => _dbcontext;

        public HomeController(ApplicationDbContext dbcontext)
        {
            _dbcontext = dbcontext;
        }

    /*    public IActionResult Index()
        {
            ViewBag.Banners = _dbcontext.Banners.OrderByDescending(b => b.BannerId).Take(1).ToList();
            ViewBag.ProductList = _dbcontext.Products.ToList();
            ViewBag.CollectionList = _dbcontext.ProductCollections.ToList();
            return View();
        }*/

        public IActionResult Index()
        {
                // Load the latest banner
            ViewBag.Banners = _dbcontext.Banners
                                .OrderByDescending(b => b.BannerId)
                                .Take(1)
                                .ToList();

            // Load products
            var allProducts = _dbcontext.Products
                                .Include(p => p.ProductCollection)
                                .Include(p => p.ProductImage)
                                .ToList();

            // Remove duplicates based on ProductCode
            var distinctProducts = allProducts
                                .GroupBy(p => p.ProductCode)
                                .Select(g => g.First())
                                .ToList();

            // Attach sizes for each product
            foreach (var product in distinctProducts)
            {
                product.Sizes = _dbcontext.Sizes
                                    .Where(s => s.ProductCode == product.ProductCode)
                                    .ToList();
            }

            ViewBag.ProductList = distinctProducts;

            // Load product collections
            ViewBag.CollectionList = _dbcontext.ProductCollections.ToList();

            return RedirectToAction("IndexPagination");
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

            //ViewBag.ProductList = _dbcontext.Products.ToList();
            return View();
        }

        [HttpPost]
        public IActionResult ProductView(Product product, List<IFormFile> ImageFiles , List<string> SizeValues, List<string> StockQuantities)
        {
            if (product.CollectionId == 0)
            {
                ModelState.AddModelError("CollectionId", "Please select a collection.");
                ViewBag.Collections = _dbcontext.ProductCollections.ToList();
                return View(product);
            }

            product.CreatedUser = "User01";
            product.CreatedDate = DateTime.Now;

            _dbcontext.Products.Add(product);
            _dbcontext.SaveChanges();

            int productId = product.ProductId;

            if (SizeValues != null && StockQuantities != null)
            {
                for (int i = 0; i < SizeValues.Count; i++)
                {
                    Size size = new Size
                    {
                        ProductCode = product.ProductCode,
                        SizeValue = SizeValues[i],
                        StockQuantity = StockQuantities[i]
                    };

                    _dbcontext.Sizes.Add(size);
                }

                _dbcontext.SaveChanges();
            }

            string folder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "ProductImages");
            if (!Directory.Exists(folder))
                Directory.CreateDirectory(folder);

            foreach (var image in ImageFiles)
            {
                if (image != null && image.Length > 0)
                {
                    string fileName = Guid.NewGuid() + "_" + Path.GetFileName(image.FileName);
                    string filePath = Path.Combine(folder, fileName);

                    using (var stream = new FileStream(filePath, FileMode.Create))
                    {
                        image.CopyTo(stream);
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

            _dbcontext.SaveChanges();

            ViewBag.Collections = _dbcontext.ProductCollections.ToList();
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
        

        [HttpPost]
        public IActionResult EditProduct(Product product, List<string> SizeValues, List<string> StockQuantities)
        {
            var existing = _dbcontext.Products.Find(product.ProductId);
            if (existing == null)
            {
                return NotFound();
            }
            existing.ProductCode = product.ProductCode;
            existing.ProductName = product.ProductName;
            existing.ProductType = product.ProductType;
            existing.OldPrice = product.OldPrice;
            existing.NewPrice = product.NewPrice;
            existing.Color = product.Color;
            existing.Category = product.Category;
            existing.CollectionId = product.CollectionId;
            _dbcontext.SaveChanges();

            // Update sizes
            var existingSizes = _dbcontext.Sizes.Where(s => s.ProductCode == existing.ProductCode).ToList();
            _dbcontext.Sizes.RemoveRange(existingSizes);
            if (SizeValues != null && StockQuantities != null)
            {
                for (int i = 0; i < SizeValues.Count; i++)
                {
                    if (!string.IsNullOrEmpty(SizeValues[i]))
                    {
                        Size size = new Size
                        {
                            ProductCode = existing.ProductCode,
                            SizeValue = SizeValues[i],
                            StockQuantity = StockQuantities[i]
                        };
                        _dbcontext.Sizes.Add(size);
                    }
                }
            }
            _dbcontext.SaveChanges();

            return RedirectToAction("Index");
        }

        public IActionResult DeleteProduct(int id)
        {
            var product = _dbcontext.Products.Find(id);
            if (product == null)
            {
                return NotFound();
            }
            product.isDeleted = true;
            _dbcontext.SaveChanges();

            // Remove images
            var images = _dbcontext.ProductsImage.Where(pi => pi.ProductId == id).ToList();
            foreach (var img in images)
            {
                var filePath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", img.ImagePath.TrimStart('/'));
                if (System.IO.File.Exists(filePath))
                {
                    System.IO.File.Delete(filePath);
                }
                _dbcontext.ProductsImage.Remove(img);
            }
            _dbcontext.SaveChanges();

            return RedirectToAction("Index");
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

        //Delete Collection
        [HttpGet]
        public async Task<IActionResult> DeleteCollection(int id)
        {
            var collection = await _dbcontext.ProductCollections
                .FirstOrDefaultAsync(c => c.CollectionId == id);

            if (collection == null)
                return NotFound();

            collection.IsDeleted = true;
            await _dbcontext.SaveChangesAsync();

            return RedirectToAction("Index");
        }

        //Edit Collection
        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult EditCollection(ProductCollection model)
        {
            if (model.CollectionId <= 0)
            {
                return BadRequest();
            }

            var collection = _dbcontext.ProductCollections
                .FirstOrDefault(c => c.CollectionId == model.CollectionId);

            if (collection == null)
            {
                return NotFound();
            }

            collection.CollectionName = model.CollectionName;
            _dbcontext.SaveChanges();

            return RedirectToAction("Index");
        }

        [HttpGet]
        public IActionResult GetCollectionsByCategory(string category)
        {
            var collections = _dbcontext.ProductCollections
                .Where(c => c.ColletionType == category && !c.IsDeleted)
                .Select(c => new
                {
                    c.CollectionId,
                    c.CollectionName
                })
                .ToList();

            return Json(collections);
        }

        public IActionResult IndexPagination(int productPage = 1, int collectionPage = 1)
        {
            int pageSize = 5;

            ViewBag.Banners = _dbcontext.Banners
                .OrderByDescending(b => b.BannerId)
                .Take(1)
                .ToList();

            var totalCollections = _dbcontext.ProductCollections.Count();
            var collections = _dbcontext.ProductCollections
                .OrderByDescending(c => c.CollectionId)
                .Skip((collectionPage - 1) * pageSize)
                .Take(pageSize)
                .ToList();

            ViewBag.CollectionList = collections;
            ViewBag.CollectionPage = collectionPage;
            ViewBag.CollectionTotalPages = (int)Math.Ceiling(totalCollections / (double)pageSize);

            var productsQuery = _dbcontext.Products
                .Include(p => p.ProductCollection)
                .Include(p => p.ProductImage)
                .OrderByDescending(p => p.ProductId);

            var totalProducts = productsQuery.Count();

            var products = productsQuery
                .Skip((productPage - 1) * pageSize)
                .Take(pageSize)
                .ToList();

            foreach (var product in products)
            {
                product.Sizes = _dbcontext.Sizes
                    .Where(s => s.ProductCode == product.ProductCode)
                    .ToList();
            }

            ViewBag.ProductList = products;
            ViewBag.ProductPage = productPage;
            ViewBag.ProductTotalPages = (int)Math.Ceiling(totalProducts / (double)pageSize);

            return View("Index");
        }
    }
}

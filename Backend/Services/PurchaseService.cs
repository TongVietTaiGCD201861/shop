using BackEnd.Data;
using BackEnd.Dtos;
using BackEnd.Models;
using BackEnd.Services.IServices;
using Microsoft.EntityFrameworkCore;

namespace BackEnd.Services
{
    public class PurchaseService : IPurchaseService
    {
        private readonly ApplicationDbContext _db;

        public PurchaseService(ApplicationDbContext db)
        {
            _db = db;
        }

        public Purchase Create(Purchase input)
        {
            try
            {
                _db.Purchases.Add(input);
                _db.SaveChanges();
                return input;
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }

        public void CreatePurchase(List<Purchase> purchases)
        {
            try
            {
                _db.Purchases.AddRange(purchases);
                _db.SaveChanges();
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }


    }
}

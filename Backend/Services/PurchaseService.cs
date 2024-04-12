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

        public IList<Purchase> GetAll()
        {
            return _db.Purchases.ToList();
        }

        public bool UpdatePurchaseStatus(int id, int status)
        {
            var purchaseToUpdate = _db.Purchases.FirstOrDefault(p => p.ID == id);

            if (purchaseToUpdate == null)
            {
                return false;
            }

            try
            {
                purchaseToUpdate.Status = status;
                _db.SaveChanges();

                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }

    }
}

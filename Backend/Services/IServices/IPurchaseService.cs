using BackEnd.Dtos;
using BackEnd.Models;

namespace BackEnd.Services.IServices
{
    public interface IPurchaseService
    {
        Purchase Create(Purchase input);

        void CreatePurchase(List<Purchase> purchases);
    }
}

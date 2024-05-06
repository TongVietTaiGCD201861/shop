using BackEnd.Dtos;
using BackEnd.Models;

namespace BackEnd.Services.IServices
{
    public interface IPurchaseService
    {
        Purchase Create(Purchase input);

        IList<Purchase> GetAll();

        bool UpdatePurchaseStatus(int id, int status);
    }
}

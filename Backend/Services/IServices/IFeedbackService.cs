using BackEnd.Dtos;
using BackEnd.Models;

namespace BackEnd.Services.IServices
{
    public interface IFeedbackService
    {
        Feedback Create(Feedback input);

        IList<Feedback> GetByShirtId(int idShirt);

    }
}

using BackEnd.Data;
using BackEnd.Dtos;
using BackEnd.Models;
using BackEnd.Services.IServices;
using Microsoft.EntityFrameworkCore;

namespace BackEnd.Services
{
    public class FeedbackService : IFeedbackService
    {
        private readonly ApplicationDbContext _db;

        public FeedbackService(ApplicationDbContext db)
        {
            _db = db;
        }

        public Feedback Create(Feedback input)
        {
            try
            {
                _db.Feedbacks.Add(input);
                _db.SaveChanges();
                return input;
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }

        public async Task<bool> DeleteFeedback(int id)
        {
            var feedback = await _db.Feedbacks.FindAsync(id);
            if (feedback == null)
            {
                return false;
            }

            _db.Feedbacks.Remove(feedback);
            await _db.SaveChangesAsync();
            return true;
        }

        public IList<Feedback> GetByShirtId(int idShirt)
        {
            try
            {
                var feedbacks = _db.Feedbacks.Where(f => f.IdShirt == idShirt).ToList();

                return feedbacks;
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }
    }
}

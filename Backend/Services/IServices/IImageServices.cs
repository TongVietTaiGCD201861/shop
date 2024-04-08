//using CloudinaryDotnet.Actions;

using CloudinaryDotNet.Actions;

namespace BackEnd.Services.IServices
{
    public interface IImageServices
    {
        String UploadFile(Stream fileStream, string filename);
        bool DeleteFile(string publicId);
    }
}

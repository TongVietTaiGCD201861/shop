using BackEnd.Services.IServices;
using System;
using System.IO;

namespace BackEnd.Services
{
    public class ImageServices : IImageServices
    {
        private readonly string _imageDirectory;

        public ImageServices()
        {
            _imageDirectory = @"C:\image";

            if (!Directory.Exists(_imageDirectory))
            {
                Directory.CreateDirectory(_imageDirectory);
            }
        }

        public string UploadFile(Stream fileStream, string fileName)
        {
            string filePath = Path.Combine(_imageDirectory, fileName);
            try
            {
                using (FileStream fs = File.Create(filePath))
                {
                    fileStream.CopyTo(fs);
                }
                return filePath;
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error uploading file: " + ex.Message);
                return null;
            }
        }

        public bool DeleteFile(string filePath)
        {
            try
            {
                File.Delete(filePath);
                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error deleting file: " + ex.Message);
                return false;
            }
        }
    }
}

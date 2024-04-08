namespace BackEnd
{
    public class AppSettings
    {
        public static string ConnectionStrings { get; private set; }
        public static string Secret { get; set; }
        public static string CORS { get; set; }
        
        // email
        public static string Mail { get; set; }
        public static string DisplayName { get; set; }
        public static string Password { get; set; }
        public static string Host { get; set; }
        public static int Port { get; set; }
        
        // google login 
        public static string GoogleClientId { get; set; }
        
        public static string GoogleClientSecret { get; set; }
    }
}

using System.Collections.Concurrent;

namespace BackEnd.Dtos
{
    public class ShareDb
    {
        private readonly ConcurrentDictionary<string,ChatMessage> _connections = new();
        public ConcurrentDictionary<string, ChatMessage> connections => _connections;
    }
}

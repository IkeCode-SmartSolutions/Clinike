using IkeCode.Web.Core.Cache;
using IkeCode.Web.Core.Log;
using System.IO;

namespace IkeCode.Web.Core.Common
{
    public class FileWatcher
    {
        #region Attributes

        private FileSystemWatcher Watcher = new FileSystemWatcher();
        public string Path { get; set; }
        public string FileName { get; set; }
        public string CacheKey { get; set; }

        #endregion

        #region Public Methods

        public FileWatcher() { }

        public FileWatcher(string path, string fileName, string cacheKey)
        {
            Path = path;
            FileName = fileName;
            CacheKey = cacheKey;
        }

        public void Start()
        {
            Watcher.Path = Path;
            Watcher.IncludeSubdirectories = true;
            Watcher.Filter = "*.xml";
            Watcher.EnableRaisingEvents = true;
            Watcher.NotifyFilter = NotifyFilters.LastWrite | NotifyFilters.Size | NotifyFilters.FileName | NotifyFilters.CreationTime;

            Watcher.Renamed += new RenamedEventHandler(watcher_Renamed);
            Watcher.Changed += new FileSystemEventHandler(watcher_Changed);
        }

        public void Stop()
        {
            Watcher.EnableRaisingEvents = false;
        }

        #endregion

        #region Events

        void watcher_Changed(object sender, FileSystemEventArgs e)
        {
            new IkeCodeCache().Remove(CacheKey);
            IkeCodeLog.Default.Verbose(string.Format("File modified: [{0}/{1}]", e.FullPath, e.Name));
        }

        void watcher_Renamed(object sender, RenamedEventArgs e)
        {
            new IkeCodeCache().Remove(CacheKey);
            IkeCodeLog.Default.Warning(string.Format("File renamed: [{0}/{1}]", e.FullPath, e.Name));
        }

        #endregion
    }
}

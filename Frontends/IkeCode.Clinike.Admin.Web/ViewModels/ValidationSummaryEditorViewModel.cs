using IkeCode.Web.Core.Model.Interfaces;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace IkeCode.Clinike.Admin.Web.ViewModels
{
    public class ValidationSummaryEditorViewModel
    {
        public Dictionary<string, List<string>> Messages { get; set; }

        public ValidationSummaryEditorViewModel()
        {
            Messages = new Dictionary<string, List<string>>();
        }

        public void AddMessages(IEnumerable<string> messages)
        {
            foreach (var message in messages)
            {
                AddMessage("", message);
            }
        }

        public void AddMessages(string key, IEnumerable<string> messages)
        {
            foreach (var message in messages)
            {
                AddMessage(key, message);
            }
        }

        public void AddMessage(string message)
        {
            AddMessage("", message);
        }

        public void AddMessage(string key, string message)
        {
            if (Messages.ContainsKey(key))
            {
                Messages[key].Add(message);
            }
            else
            {
                var messages = new List<string>();
                messages.Add(message);
                Messages[key] = messages;
            }
        }
    }
}
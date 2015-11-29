namespace IkeCode.Clinike.Data.Interfaces
{
    using IkeCode.Clinike.Data.Enums;
    using System;

    public interface ISchedule : IBaseModel
    {
        DateTime StartDate { get; }
        DateTime EndDate { get; }
        bool AllDay { get; }
        ScheduleType ScheduleType { get; }
        int PatientId { get; }
        int DoctorId { get; }
    }
}

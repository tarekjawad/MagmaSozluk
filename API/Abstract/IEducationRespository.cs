using System.Collections.Generic;
using System.Threading.Tasks;
using API.Entities;

namespace API.Abstract
{
    public interface IEducationRespository
    {
        void AddSchool(School school);
        void AddClass(Class clas);
        void UpdateSchool(School school);
        void UpdateClass(Class clas);
        Task<IEnumerable<School>> GetSchoolsAsync();
        Task<School> GetSchoolByIdAsync(int id);
        Task<IEnumerable<Class>> GetClassesAsync();
        Task<Class> GetClassByIdAsync(int id);
        Task<bool> SchoolExists(int id);
        Task<bool> ClassExists(int id);
    }
}
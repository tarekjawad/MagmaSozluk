using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Abstract;
using API.Entities;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class EducationRespository:IEducationRespository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public EducationRespository(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }

        public async void AddClass(Class clas)
        {
            _context.Classes.Add(clas);
            await _context.SaveChangesAsync();
        }

        public async void AddSchool(School school)
        {
           _context.Schools.Add(school);
            await _context.SaveChangesAsync();
        }

        public async Task<Class> GetClassByIdAsync(int id)
        {
            return await _context.Classes
                .Where(x => x.Id == id)
                .SingleOrDefaultAsync();
        }

        public async Task<IEnumerable<Class>> GetClassesAsync()
        {
             return await _context.Classes.ToListAsync();
        }

        public async Task<School> GetSchoolByIdAsync(int id)
        {
            return await _context.Schools
                .Where(x => x.Id == id)
                .SingleOrDefaultAsync();
        }

        public async Task<IEnumerable<School>> GetSchoolsAsync()
        {
             return await _context.Schools.ToListAsync();
        }

        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0;

        }

        public void UpdateClass(Class clas)
        {
            _context.Entry(clas).State = EntityState.Modified;
        }

        public void UpdateSchool(School school)
        {
            _context.Entry(school).State = EntityState.Modified;
        }
        public async Task<bool> ClassExists(int id)
        {

            return await _context.Classes.AnyAsync(x => x.Id == id);
        }
        public async Task<bool> SchoolExists(int id)
        {

            return await _context.Schools.AnyAsync(x => x.Id == id);
        }
    }
}
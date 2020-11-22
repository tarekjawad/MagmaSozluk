using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Abstract;
using API.DTOs;
using API.Entities;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class EducationController : BaseAPIController
    {
        private readonly IEducationRespository _educationRepository;
        private readonly IMapper _mapper;
        public EducationController(IEducationRespository educationRepository, IMapper mapper)
        {
            _mapper = mapper;
            _educationRepository = educationRepository;
        }
        [HttpGet("schools")]
        public async Task<ActionResult<IEnumerable<School>>> GetSchools()
        {
            var schools = await _educationRepository.GetSchoolsAsync();
            return Ok(schools);
        }
        [HttpGet("school/{id}")]
        public async Task<ActionResult<School>> GetSchoolById(int id)
        {
             return await _educationRepository.GetSchoolByIdAsync(id);
            
        }
         [HttpGet("classes")]
        public async Task<ActionResult<IEnumerable<Class>>> GetClasses()
        {
            var classes = await _educationRepository.GetClassesAsync();
            return Ok(classes);
        }
        [HttpGet("class/{id}")]
        public async Task<ActionResult<Class>> GetClassById(int id)
        {
             return await _educationRepository.GetClassByIdAsync(id);
            
        }

        [HttpPost("addclass")]
        public async Task<ActionResult<Class>> AddClass(Class clas)
        {
            if (await _educationRepository.ClassExists(clas.Id)) return BadRequest("Class is already exists");
            _educationRepository.AddClass(clas);
            return clas;
        }
        
        [HttpPost("addschool")]
        public async Task<ActionResult<School>> AddSchool(School school)
        {
            if (await _educationRepository.SchoolExists(school.Id)) return BadRequest("School is already exists");
            _educationRepository.AddSchool(school);
            return school;
        }
    }
}

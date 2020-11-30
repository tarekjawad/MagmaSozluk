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
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;
        public EducationController(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }
        [HttpGet("schools")]
        public async Task<ActionResult<IEnumerable<School>>> GetSchools()
        {
            var schools = await _unitOfWork.EducationRespository.GetSchoolsAsync();
            return Ok(schools);
        }
        [HttpGet("school/{id}")]
        public async Task<ActionResult<School>> GetSchoolById(int id)
        {
            return await _unitOfWork.EducationRespository.GetSchoolByIdAsync(id);

        }
        [HttpGet("classes")]
        public async Task<ActionResult<IEnumerable<Class>>> GetClasses()
        {
            var classes = await _unitOfWork.EducationRespository.GetClassesAsync();
            return Ok(classes);
        }
        [HttpGet("class/{id}")]
        public async Task<ActionResult<Class>> GetClassById(int id)
        {
            return await _unitOfWork.EducationRespository.GetClassByIdAsync(id);

        }

        [HttpPost("addclass")]
        public async Task<ActionResult<Class>> AddClass(Class clas)
        {
            if (await _unitOfWork.EducationRespository.ClassExists(clas.Id)) return BadRequest("Class is already exists");
            _unitOfWork.EducationRespository.AddClass(clas);
            return clas;
        }

        [HttpPost("addschool")]
        public async Task<ActionResult<School>> AddSchool(School school)
        {
            if (await _unitOfWork.EducationRespository.SchoolExists(school.Id)) return BadRequest("School is already exists");
            _unitOfWork.EducationRespository.AddSchool(school);
            return school;
        }
    }
}

using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Abstract;
using API.DTOs;
using API.Entities;
using API.Helpers;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class UserRepository : IUserRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public UserRepository(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }

        public async Task<MemberDto> GetMemberAsync(string username)
        {
            return await _context.Users
                .Where(x => x.UserName == username)
                .ProjectTo<MemberDto>(_mapper.ConfigurationProvider)
                .SingleOrDefaultAsync();
        }

        public async Task<PagedList<MemberDto>> GetMembersAsync(UserParams userParams)
        {
            var query = _context.Users.AsQueryable();
            query = query.Where(u => u.UserName != userParams.CurrentUsername);

            if (userParams.City != null)
            {

                query = query.Where(u => u.City == userParams.City);

                if (userParams.SchoolId != 0 && userParams.ClassId == 0)
                {
                    query = query.Where(u => u.SchoolId == userParams.SchoolId);
                }
                if (userParams.SchoolId != 0 && userParams.ClassId != 0)
                {
                    query = query.Where(u => u.SchoolId == userParams.SchoolId);
                    query = query.Where(u => u.ClassId == userParams.ClassId);
                }
            }
            else
            {
                if (userParams.SchoolId != 0 && userParams.ClassId == 0)
                {
                    query = query.Where(u => u.SchoolId == userParams.SchoolId);
                }
                if (userParams.SchoolId != 0 && userParams.ClassId != 0)
                {
                    query = query.Where(u => u.SchoolId == userParams.SchoolId);
                    query = query.Where(u => u.ClassId == userParams.ClassId);

                }
            }

            query = userParams.OrderBy switch
            {
                "created" => query.OrderByDescending(u => u.Created),
                _ => query.OrderByDescending(u => u.LastActive)
            };
            return await PagedList<MemberDto>.CreateAsync(query.ProjectTo<MemberDto>(_mapper.ConfigurationProvider)
            .AsNoTracking(), userParams.PageNumber,
            userParams.PageSize);

        }
        public async Task<AppUser> GetUserByIdAsync(int id)
        {
            return await _context.Users.FindAsync(id);
        }
        public async Task<AppUser> GetUserByUsernameAsync(string username)
        {
            return await _context.Users
            .Include(p => p.Photos)
            .SingleOrDefaultAsync(x => x.UserName == username);
        }


        public async Task<IEnumerable<AppUser>> GetUsersAsync()
        {
            return await _context.Users
            .Include(p => p.Photos)
            .ToListAsync();
        }
        public void Update(AppUser user)
        {
            _context.Entry(user).State = EntityState.Modified;
        }
    }
}
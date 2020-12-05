using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Abstract;
using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Helpers;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class FollowsRepository : IFollowsRepository
    {
        private readonly DataContext _context;
        public FollowsRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<UserFollow> GetUserFollow(int sourceUserId, int followedUserId)
        {
            return await _context.Follows.FindAsync(sourceUserId,followedUserId);
        }

        public async Task<PagedList<FollowDto>> GetUserFollows(FollowsParams followsParams)
        {
            var users=_context.Users.OrderBy(u =>u.UserName).AsQueryable();
            var follows = _context.Follows.AsQueryable();
            if (followsParams.Predicate=="followed")
            {
                follows=follows.Where(follow =>follow.SourceUserId==followsParams.UserId);
                users=follows.Select(follow => follow.FollowedUser);
            }
            if (followsParams.Predicate=="followedBy")
            {
                follows=follows.Where(follow =>follow.FollowedUserId==followsParams.UserId);
                users=follows.Select(follow => follow.SourceUser);
            }
            var followedUsers= users.Select(user =>new FollowDto{
                Username=user.UserName,
                KnownAs=user.KnownAs,
                Age=user.DateOfBirth.CalculateAge(),
                PhotoUrl=user.Photos.FirstOrDefault(p => p.IsMain).Url,
                City=user.City,
                Id=user.Id

            });
            return await PagedList<FollowDto>.CreateAsync(followedUsers,followsParams.PageNumber,followsParams.PageSize);
        }


        public async Task<AppUser> GetUsersWithFollows(int userId)
        {
            return await _context.Users
            .Include(x => x.FollowedUsers)
            .FirstOrDefaultAsync(x=> x.Id==userId);
        }
    }
}
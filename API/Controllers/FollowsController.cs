using System.Collections.Generic;
using System.Threading.Tasks;
using API.Abstract;
using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Helpers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Authorize]
    public class FollowsController : BaseAPIController
    {
        private readonly IFollowsRepository _followsRepository;
        private readonly IUserRepository _userRepository;
        public FollowsController(IUserRepository userRepository, IFollowsRepository followsRepository)
        {
            _userRepository = userRepository;
            _followsRepository = followsRepository;

        }

        [HttpPost("{username}")]
        public async Task<ActionResult> AddFollow(string username)
        {
            var sourceUserId = User.GetUserId();
            var followedUser = await _userRepository.GetUserByUsernameAsync(username);
            var sourceUser = await _followsRepository.GetUsersWithFollows(sourceUserId);
            if (followedUser == null) return NotFound();

            if (sourceUser.UserName == username) return BadRequest("Kendini takip edemezsin(Bizde öyle)");

            var userFollow = await _followsRepository.GetUserFollow(sourceUserId, followedUser.Id);

            if (userFollow != null) return BadRequest("Bu kişiyi zaten takip etmektesin.");

            userFollow = new UserFollow
            {
                SourceUserId = sourceUserId,
                FollowedUserId = followedUser.Id
            };
            sourceUser.FollowedUsers.Add(userFollow);

            if (await _userRepository.SaveAllAsync()) return Ok();
            return BadRequest("Başarısız bir istek");
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<FollowDto>>> GetUserFollows([FromQuery]FollowsParams followsParams)
        {

            followsParams.UserId = User.GetUserId();
            var users = await _followsRepository.GetUserFollows(followsParams);
            Response.AddPaginationHeader(users.CurrentPage, users.PageSize, users.TotalCount, users.TotalPages);
            return Ok(users);
        }
    }
}
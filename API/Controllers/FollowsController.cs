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
        private readonly IUnitOfWork _unitOfWork;

        public FollowsController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        [HttpPost("{username}")]
        public async Task<ActionResult> AddFollow(string username)
        {
            var sourceUserId = User.GetUserId();
            var followedUser = await _unitOfWork.UserRepository.GetUserByUsernameAsync(username);
            var sourceUser = await _unitOfWork.FollowsRepository.GetUsersWithFollows(sourceUserId);
            if (followedUser == null) return NotFound();

            if (sourceUser.UserName == username) return BadRequest("Kendini takip edemezsin(Bizde öyle)");

            var userFollow = await _unitOfWork.FollowsRepository.GetUserFollow(sourceUserId, followedUser.Id);

            if (userFollow != null) return BadRequest("Bu kişiyi zaten takip etmektesin.");

            userFollow = new UserFollow
            {
                SourceUserId = sourceUserId,
                FollowedUserId = followedUser.Id
            };
            sourceUser.FollowedUsers.Add(userFollow);

            if (await _unitOfWork.Complete()) return Ok();
            return BadRequest("Başarısız bir istek");
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<FollowDto>>> GetUserFollows([FromQuery] FollowsParams followsParams)
        {

            followsParams.UserId = User.GetUserId();
            var users = await _unitOfWork.FollowsRepository.GetUserFollows(followsParams);
            Response.AddPaginationHeader(users.CurrentPage, users.PageSize, users.TotalCount, users.TotalPages);
            return Ok(users);
        }
    }
}
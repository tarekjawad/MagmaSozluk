using System.Collections.Generic;
using System.Threading.Tasks;
using API.Abstract;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Helpers;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Authorize]
    public class PostsController : BaseAPIController
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly DataContext _context;
        public PostsController(IUnitOfWork unitOfWork, IMapper mapper, DataContext context)
        {
            _context = context;
            _mapper = mapper;
            _unitOfWork = unitOfWork;
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserPost>>> GetPosts([FromQuery] PostParams postParams)
        {
            var posts = await _unitOfWork.PostsRepository.GetPostsAsync(postParams);
            var returnPosts=  _mapper.Map<PostDto[]>(posts);
            Response.AddPaginationHeader(posts.CurrentPage, posts.PageSize, posts.TotalCount, posts.TotalPages);
            return Ok(returnPosts);
        }
        [HttpPost]
        public async Task<ActionResult<UserPost>> PostaPost(PostDto postDto)
        {
            
            var sourceUserId = User.GetUserId();
            var user = await _unitOfWork.UserRepository.GetUserByIdAsync(sourceUserId);
            
            var post = new UserPost
            {
                SourceUser = user,
                SourceUserId = sourceUserId,
                SourceUsername=User.GetUsername(),
                KindId = postDto.KindId,
                Title = postDto.Title,
                Content = postDto.Content
            };
            _unitOfWork.PostsRepository.Add(post);
            if (await _unitOfWork.Complete()) return Ok();
            return BadRequest("Başarısız bir istek");
        }
    }
}
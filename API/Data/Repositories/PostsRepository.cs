using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Abstract;
using API.Entities;
using API.Helpers;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace API.Data.Repositories
{
    public class PostsRepository : IPostsRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public PostsRepository(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }

        public void Add(UserPost post)
        {
            _context.Posts.Add(post);
        }

        public Task<UserPost> GetPostByIdAsync(int id)
        {
            throw new System.NotImplementedException();
        }

        public async Task<PagedList<UserPost>> GetPostsAsync(PostParams postParams)
        {
            var posts =  _context.Posts.AsQueryable();
            return await PagedList<UserPost>.CreateAsync(posts, postParams.PageNumber, postParams.PageSize);

        }

        public Task<PagedList<UserPost>> GetUserPostsAsync(UserParams userParams)
        {
            throw new System.NotImplementedException();
        }

        public void Update(UserPost post)
        {
            throw new System.NotImplementedException();
        }
    }
}
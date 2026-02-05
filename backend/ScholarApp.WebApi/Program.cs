using Microsoft.EntityFrameworkCore;
using ScholarApp.Application.Interfaces;
using ScholarApp.Application.Services;
using ScholarApp.Infrastructure.Data;
using ScholarApp.Infrastructure.Repositories;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<AuthService>();

builder.Services.AddScoped<IBannerRepository, BannerRepository>();
builder.Services.AddScoped<BannerService>();

builder.Services.AddScoped<ICourseRepository, CourseRepository>();
builder.Services.AddScoped<CourseService>();

builder.Services.AddScoped<IServiceRepository, ServiceRepository>();
builder.Services.AddScoped<ServiceService>();

builder.Services.AddScoped<IAboutUsAccordionRepository, AboutUsAccordionRepository>();
builder.Services.AddScoped<AboutUsAccordionService>();

builder.Services.AddScoped<IFunFactRepository,  FunFactRepository>();
builder.Services.AddScoped<FunFactService>();

builder.Services.AddScoped<ITeamMemberRepository, TeamMemberRepository>();
builder.Services.AddScoped<TeamMemberService>();

builder.Services.AddScoped<ITeamMemberSocialRepository, TeamMemberSocialRepository>();
builder.Services.AddScoped<TeamMemberSocialService>();

builder.Services.AddScoped<IEventsRepository, EventsRepository>();
builder.Services.AddScoped<EventsService>();

builder.Services.AddScoped<IContactSectionContentRepository, ContactSectionContentRepository>();
builder.Services.AddScoped<ContactSectionContentService>();

builder.Services.AddScoped<IContactMessageRepository, ContactMessageRepository>();
builder.Services.AddScoped<ContactMessageService>();

builder.Services.AddScoped<ITestimonialRepository, TestimonialRepository>();
builder.Services.AddScoped<TestimonialService>();

builder.Services.AddScoped<IStatisticsRepository, StatisticsRepository>();
builder.Services.AddScoped<StatisticsService>();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        policy => policy.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod());
});

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Redirect root to Swagger with HTTPS
app.MapGet("/", () => Results.Redirect("https://localhost:5000/swagger/index.html", permanent: true));

app.UseHttpsRedirection();
app.UseCors("AllowAll");
app.UseAuthorization();

app.MapControllers();

app.Run();

using Microsoft.EntityFrameworkCore;

using StudentPortal.Web.Data;
using System.Configuration;



namespace StudentPortal.Web
{
    public class Program
    {

        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);
            //builder.Services.AddKendo();
            builder.Services.Configure<MailSettings>(builder.Configuration.GetSection("MailSettings"));
            // Add services to the container.
           // builder.Services.AddSession();

            builder.Services.AddControllersWithViews();
            

            builder.Services.AddDbContext<ApplicationDBContext>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("StudentPortal")));
            

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (!app.Environment.IsDevelopment())
            {
                app.UseExceptionHandler("/Home/Error");
            }
            app.UseStaticFiles();
            

            app.UseRouting();

            app.UseAuthorization();

            //app.UseSession();

            //app.UseKendo();
            
            app.MapControllerRoute(
                name: "default",
                pattern: "{controller=Home}/{action=Login}/{id?}"
            );
            
            app.Run();
        }
    }
}

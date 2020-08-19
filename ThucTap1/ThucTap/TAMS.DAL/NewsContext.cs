using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TAMS.DAL
{
    public class NewsContext : BaseContext
    {
        private static NewsContext _instance;
        public static NewsContext Instance()
        {
            if (null == _instance)
            {
                _instance = new NewsContext();
            }
            return _instance;
        }

        //public int Create(Entity.News obj)
        //{
        //    using (var context = MasterDBContext())
        //    {
        //        return context.StoredProcedure("Ad_Event_Create")
        //            .Parameter("Name", obj.Name)
        //            .Parameter("Status", obj.Status)
        //            .Parameter("StartDate", obj.StartDate)
        //            .Parameter("EndDate", obj.EndDate)
        //            .QuerySingle<int>();
        //    }
        //}

        //public void Update(Entity.News obj)
        //{
        //    using (var context = MasterDBContext())
        //    {
        //        context.StoredProcedure("Ad_Event_Update")
        //            .Parameter("Id", obj.Id)
        //            .Parameter("Name", obj.Name)
        //            .Parameter("StartDate", obj.StartDate)
        //            .Parameter("EndDate", obj.EndDate)
        //            .Parameter("Status", obj.Status)
        //            .Execute();
        //    }
        //}

        //public void Delete(int id)
        //{
        //    using (var context = MasterDBContext())
        //    {
        //        context.StoredProcedure("Ad_Event_Delete")
        //            .Parameter("Id", id)
        //            .Execute();
        //    }
        //}

        public List<Entity.News> GetByCateNewsId(int cateNewsId, int top)
        {
            using (var context = MasterDBContext())
            {
                return context.StoredProcedure("FE_News_GetByCateId")
                    .Parameter("CateNewsId", cateNewsId)
                    .Parameter("Top", top)
                    .QueryMany<Entity.News>();
            }
        }

        public List<Entity.News> GetHighlight(int top, string lang)
        {
            using (var context = MasterDBContext())
            {
                return context.StoredProcedure("FE_News_GetHighlight")
                    .Parameter("Top", top)
                    .Parameter("Lang", lang)
                    .QueryMany<Entity.News>();
            }
        }

        public List<Entity.News> Search(int catenewsId, string lang, int pageIndex, int pageSize, out int totalRecord)
        {
            totalRecord = 0;
            List<Entity.News> listReturn = new List<Entity.News>();
            using (var context = MasterDBContext())
            {
                var cmd = context.StoredProcedure("FE_News_Search")
                    .Parameter("CateNewsId", catenewsId)
                    .Parameter("Lang", lang)
                    .Parameter("PageIndex", pageIndex)
                    .Parameter("PageSize", pageSize)
                    .ParameterOut("TotalRecord", FluentData.DataTypes.Int32);
                listReturn = cmd.QueryMany<Entity.News>();
                totalRecord = cmd.ParameterValue<int>("TotalRecord");
            }
            return listReturn;
        }
    }
}

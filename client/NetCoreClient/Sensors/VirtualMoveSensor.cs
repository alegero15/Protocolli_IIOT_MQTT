using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace NetCoreClient.Sensors
{
    internal class VirtualMoveSensor : IMoveSensorInterface
    {
        private readonly Random Random;

        public VirtualMoveSensor()
        {
            Random = new Random();
        }

        public string GetSlug()
        {
            throw new NotImplementedException();
        }

        public int[] Move()
        {
            //return new Move(Random.Next(300)).Value;
            int x = Random.Next(200);
            int y = Random.Next(200);
            int z = Random.Next(200);
            int[] array = new int[3];
            array[0] = x;
            array[1] = y;
            array[2] = z;
            return array;
        }


        public string ToJson()
        {
            return JsonSerializer.Serialize(Move());
        }
    }
}

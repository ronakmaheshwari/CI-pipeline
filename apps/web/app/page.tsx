import {client} from "@repo/db/client"

export default async function Home() {
  const databaseUrl = process.env.DATABASE_URL;
  console.log(databaseUrl);
  const user = await client.user.findMany();
  return (
    <div>
      {user.map((x)=>(
        <ol>
          <li key={x.id}>{x.username}</li>
          <p>{x.password}</p>
        </ol>
      ))}
    </div>
  )
}

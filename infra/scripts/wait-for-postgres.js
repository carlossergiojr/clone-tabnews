const { exec } = require("node:child_process");

async function checkPostgres() {
  exec("docker exec postgres-dev pg_isready --host localhost", handleReturn);

  function handleReturn(error, stdout) {
    if (stdout.search("accepting connections") === -1) {
      process.stdout.write(".");
      setTimeout(checkPostgres, 1500);
      return;
    }
    console.log("\n Postgres está pronto e aceitando conexões!\n");
  }
}

process.stdout.write("\n\n Aguardando Postgres aceitar conexões...");
checkPostgres();

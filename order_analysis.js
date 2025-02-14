const fs = require("fs");
const csv = require("csv-parser");

// Controllo argomento
if (process.argv.length < 3) {
  console.error("Errore: Specificare il percorso del file CSV.");
  process.exit(1);
}

const filePath = process.argv[2];
const orders = [];

// Funzione per elaborare una riga del CSV
const processOrder = (row) => {
  try {
    const order = {
      id: row.Id,
      article: row["Article Name"],
      quantity: parseInt(row.Quantity, 10) || 0,
      unitPrice: parseFloat(row["Unit price"]) || 0,
      discount: parseFloat(row["Percentage discount"]) || 0,
      buyer: row.Buyer || "Sconosciuto",
    };

    order.total = order.quantity * order.unitPrice;
    order.discountedTotal = parseFloat((order.total * (1 - order.discount / 100)).toFixed(2));
    order.difference = parseFloat((order.total - order.discountedTotal).toFixed(2));

    orders.push(order);
  } catch (error) {
    console.error("Errore nell'elaborazione della riga:", row, error);
  }
};

// Funzione per stampare i risultati
const printResults = () => {
  if (orders.length === 0) {
    console.error("Errore: Il file CSV è vuoto o malformattato.");
    process.exit(1);
  }

  const highestTotal = orders.reduce((max, order) => (order.discountedTotal > max.discountedTotal ? order : max), orders[0]);
  const highestQuantity = orders.reduce((max, order) => (order.quantity > max.quantity ? order : max), orders[0]);
  const maxDifference = orders.reduce((max, order) => (order.difference > max.difference ? order : max), orders[0]);

  console.log("\n Record con importo totale più alto:");
  console.table([highestTotal]);

  console.log("\n Record con quantità più alta:");
  console.table([highestQuantity]);

  console.log("\n Record con maggior differenza tra totale senza sconto e totale con sconto:");
  console.table([maxDifference]);

  console.log("\n Lista completa degli ordini ordinata per differenza:");
  console.table(
    orders.sort((a, b) => b.difference - a.difference).map((order) => ({
      ID: order.id,
      Articolo: order.article,
      Differenza: `€${order.difference}`,
    }))
  );
};

// Lettura e parsing del CSV
fs.createReadStream(filePath)
  .pipe(csv())
  .on("data", processOrder)
  .on("end", printResults)
  .on("error", (error) => {
    console.error("Errore nella lettura del file CSV:", error);
  });

Backend Test - Elaborazione Ordini CSV

Descrizione
Questo script permette di elaborare un file CSV contenente una lista di ordini e restituire alcune informazioni chiave, tra cui:  
- L'ordine con l'importo totale più alto  
- L'ordine con la quantità più alta  
- L'ordine con la maggiore differenza tra il totale senza sconto e il totale con sconto  

Struttura del CSV
Il file deve seguire questa struttura:

   Id,Article Name,Quantity,Unit price,Percentage discount,Buyer
   1,Coke,10,1,0,Mario Rossi
   2,Coke,15,2,0,Luca Neri
   3,Fanta,5,3,2,Luca Neri
   4,Water,20,1,10,Mario Rossi
   5,Fanta,1,4,15,Andrea Bianchi



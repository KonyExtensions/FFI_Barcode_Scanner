function scanVINBarcode(  ){
	PlatformName=kony.os.deviceInfo().name
	if(kony.string.startsWith(PlatformName, "android", true)== true){		
			getbarcodeAndroid();
	}else if(kony.string.startsWith(PlatformName, "iphone", true)== true ||
		kony.string.startsWith(PlatformName, "ipad", true)== true){
			capture();
	}
	else
	{
		kony.print("no scanning");
	}
}

/** 
 * 
 * ============== Android Barcode Scanner ===========================
 * 
 */
 
function getbarcodeAndroid(  ){

	scanbarcodeffi.getbarcode(onBarcodeScan);
	
}

function onBarcodeScan( a, b ){
	//kony.print("value of scanned data-----"+b);
	//kony.print("a=" + a);
	//kony.print("b=" + b);
	kony.print("value of scanned data for Android-----"+b);
	gScannedText = b;
	if (gScannedText == "" || gScannedText == null)
	{
		var infoAlert =  kony.ui.Alert({message:"Scanning Failed",alertType: constants.ALERT_TYPE_INFO,alertTitle: "CUB",yesLabel:"OK",noLabel: "Cancel", alertHandler: null},{});
	}
	else
	{
		scannedText(gScannedText);
	}
}

 
/**
 * 
 * ============================= IOS Barcode Scanner =================================
 * 
 */
 
function capture( dummy ){
	gScannedText = scanbarcodeffi.getscancode();
	kony.print("gScannedText..........."+gScannedText);
	if(gScannedText == "" || gScannedText == null)
	{
    	alert("Scanning failed, please scan again.")
    	return false;
    } 
    else 
    {
    	kony.print("The text of the scanned barcode is: \n"+ gScannedText);
		scannedText(gScannedText);
	}
	
}

 function scannedText(gScannedText)
{
kony.print("gScannedText----------"+gScannedText);

if(gScannedText=="0123456789" )
{
	scanned_data="ItemName:Milk,ItemProducer:Natural,ItemDescription:1 Gal,LineItemQuantity:1,ItemPrice:2.99,Inventory:2,Image:milk.png";
}
else if(gScannedText=="1111111111")
{
	scanned_data="ItemName:Fish,ItemProducer:Packer,ItemDescription:2 lbs,LineItemQuantity:1,ItemPrice:14.68,Inventory:0,Image:fish.png"
}
	
	//ItemName:Milk,ItemProducer:Natural,ItemDescription:10/Case,LineItemQuantity:2,ItemPrice:15.25,Inventory:6,Image:milk.png
	var scanString = scanned_data.split(",");
	kony.print("scanString..............."+scanString);
	//ItemName
	var scanItemName = scanString[0];
	kony.print("scanItemName..............."+scanItemName);
	var ItemNameDup = scanItemName.split(":");
	kony.print("ItemNameDup[1]..............."+ItemNameDup[1]);
	ItemName = ItemNameDup[1];
	//ItemProducer
	var scanItemProducer = scanString[1];
	kony.print("scanItemProducer..............."+scanItemProducer);
	var ItemProducerDup = scanItemProducer.split(":");
	kony.print("ItemProducerDup[1]..............."+ItemProducerDup[1]);
	ItemProducer = ItemProducerDup[1];
	//ItemDescription
	var scanItemDescription = scanString[2];
	kony.print("scanItemDescription..............."+scanItemDescription);
	var ItemDescriptionDup = scanItemDescription.split(":");
	kony.print("ItemDescriptionDup[1]..............."+ItemDescriptionDup[1]);
	ItemDescription = ItemDescriptionDup[1];
	//LineItemQuantity
	var scanLineItemQuantity = scanString[3];
	kony.print("scanLineItemQuantity..............."+scanLineItemQuantity);
	var LineItemQuantityDup = scanLineItemQuantity.split(":");
	kony.print("LineItemQuantityDup[1]..............."+LineItemQuantityDup[1]);
	LineItemQuantity = LineItemQuantityDup[1];
	//ItemPrice
	var scanItemPrice = scanString[4];
	kony.print("scanItemPrice..............."+scanItemPrice);
	var ItemPriceDup = scanItemPrice.split(":");
	kony.print("ItemPriceDup[1]..............."+ItemPriceDup[1]);
	ItemPrice1 = ItemPriceDup[1];
	//Inventory
	var scanInventory = scanString[5];
	kony.print("scanInventory..............."+scanInventory);
	var InventoryDup = scanInventory.split(":");
	kony.print("InventoryDup[1]..............."+InventoryDup[1]);
	Inventoryval1 = InventoryDup[1];
	//Image
	var scanImage = scanString[6];
	kony.print("scanImage..............."+scanImage);
	var ImageDup = scanImage.split(":");
	kony.print("ImageDup[1]..............."+ImageDup[1]);
	Imagename = ImageDup[1];
	var Inventoryval = kony.os.toNumber(Inventoryval1);
	var ItemPrice = kony.os.toNumber(ItemPrice1);
				
	            var isVisible = false;
				var isCoupon = false;
				
				if (Inventoryval == 0) {
					isVisible = true;
					kony.print("Is true");				
				}
				if (Inventoryval !=0) {
					isCoupon = true;
					kony.print("Is true coupon");				
				}
				myData.splice(0,0,{	
					"lblProdName": {
						"text" : ItemName,
						"skin" : (Inventoryval == 0) ? lblRed : lblBlackBold
					},
				
					"lblProducer" : {
						"text" : ItemProducer,
						"skin" : (Inventoryval == 0) ? lblRedSmall: lblBlack
					},
					
					"lblDesc": {
						"text" :  ItemDescription,
						"skin" : (Inventoryval == 0) ? lblRedSmall: lblBlack
					},
					
					"txtQty": {
						"text" : ""+Inventoryval,
						"invisible" : !isVisible
					},
					
					"img": {
						"src" : Imagename
					},
										
					"lblPrice": {
					   "text":kony.os.toCurrency(ItemPrice),
					   "skin":(Inventoryval == 0) ? lblRedSmall: lblBlackSmall
									
					}, 
					
					"btnUp" : {
						"skin" : btnAddn,
						"text" : "."
					},
					
					"btnDown" : {
						"skin" : btnReduce,
						"text" : "." 
					},
					
					
					"hboxOOS" : {
						"isVisible": isVisible
					},
							
					"lblOOS" : {
						"text" : "Out of stock",
						"isVisible": isVisible
					},
		        	
					"imgOOS": {
	                	"isVisible": isVisible,
	                	"src": "icn_out.png"
	            	},
	            	
	            	"imgCoupon": {
	                	"isVisible": true,
	                	"src": (Inventoryval != 0) ? "coupon.png": "coupontrans.png"
	            	},
	            	
	            	"hboxButtons" : {
	            		"isVisible": !isVisible
	            	}
	            	
	            			
				});
		
		kony.print("MyData=" + myData);
		//kony.print("frmOrder.listSeg=" + frmOrder.listSeg);
		frmOrder.listSeg.setData(myData);
		kony.print("now calculate the totals"); 
		calculateTotals(client);
	//	frmOrder.show();
}
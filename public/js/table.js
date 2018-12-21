$(function () {
    var searchText = $("#searchText");

    var tempProduct = [];

    // $.get("/userLogin", function(data) {   
    //     $.get("/myInventory/" + data, function(newData){

    //To find inventory for an specific user
    $.get("/userLogin", function (data) {
        $.get("/myInventory/" + data, function (newData) {
            let inv = JSON.parse(newData)
            tempProduct = inv;

            for (let i = 0; i < inv.length; i++) {

                var rowData = $("<tr>");
                rowData.addClass("product-data");
                rowData.attr("id", i);

                var colName = $("<td>");
                colName.append(inv[i].name);

                var colCategory = $("<td>");
                colCategory.append(inv[i].category);

                var colBrand = $("<td>");
                colBrand.append(inv[i].brand);

                var colPrice = $("<td>");
                colPrice.append("$ "+inv[i].price);

                var colQuantity = $("<td>");
                colQuantity.append(inv[i].quantity);

                var colEdit = $("<td id='edit'>");
                colEdit.append("<a type='button' class='btn btn-light' data-toggle='modal' data-target='#inventoryModal' id='inv-modal' data-inv='"+i+"'>Edit</a>");

                rowData.append(colName)
                    .append(colCategory)
                    .append(colBrand)
                    .append(colPrice)
                    .append(colQuantity)
                    .append(colEdit)

                $("#dataProducts").append(rowData);
            }
        })
    });

        // --- editing existing inventory
    
        var tempID;
        $(document).on("click","#inv-modal",function(){
    
            tempID = $(this).attr("data-inv");
            console.log("ID: "+tempID);
    
            console.log(tempProduct[tempID]);
    
            $("#change-product-name").val(tempProduct[tempID].name);
            $("#change-category").val(tempProduct[tempID].category);
            $("#change-quantity").val(tempProduct[tempID].quantity);
            $("#change-price").val(tempProduct[tempID].price);
            $("#change-brand").val(tempProduct[tempID].brand);
        });

        // updates info
        $(document).on("click","#change-product-info",function(event){
            event.preventDefault();
            var newProduct = {
                name: $("#change-product-name").val(),
                category: $("#change-category").val(),
                brand: $("#change-brand").val(),
                price: $("#change-price").val(),
                quantity: $("#change-quantity").val(),
                id: tempProduct[tempID].id
            };

            $.ajax({
                method: "put",
                url: "/updateInventory",
                data: newProduct
            }).then(function(){
                window.location.href = "../dashboard.html";
            });
        });
        
})
sap.ui.define([
	"sap/ui/model/json/JSONModel",
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	'sap/ui/model/Sorter',
	'sap/m/MessageBox',
	'sap/f/library'
], function (JSONModel, Controller, Filter, FilterOperator, Sorter, MessageBox,fioriLibrary) {
	"use strict";

	return Controller.extend("sap.ui.demo.fiori2.controller.Master", {
		onInit: function () {
			this.oView = this.getView();
			this._bDescendingSort = false;
            this.oProductsTable = this.oView.byId("productsTable");
			this.oRouter = this.getOwnerComponent().getRouter();
			this.start_id="0000"
			this.oSF=this.getView().byId("searchField")
		},

		onSuggest: function (event) {
			var sValue = event.getParameter("suggestValue"),
				aFilters = [];
			if (sValue) {
				aFilters = [
					new Filter([
						new Filter("ProductId", function (sText) {
							return (sText || "").toUpperCase().indexOf(sValue.toUpperCase()) > -1;
						}),
						new Filter("Name", function (sDes) {
							return (sDes || "").toUpperCase().indexOf(sValue.toUpperCase()) > -1;
						})
					], false)
				];
			}

			this.oSF.getBinding("suggestionItems").filter(aFilters);
			this.oSF.suggest();
		},

		onSearch: function (oEvent) {
			var oTableSearchState = [],
				sQuery = oEvent.getParameter("query");

			if (sQuery && sQuery.length > 0) {
				oTableSearchState =new Filter({
					filters:[new Filter("Name", FilterOperator.Contains, sQuery),new Filter("id", FilterOperator.Contains, sQuery)]
				});
			}

			this.oProductsTable.getBinding("items").filter(oTableSearchState, "Application");
		},

		profile:function(){
			this.oRouter.navTo('profile');	
		},

		onAdd: function () {
			this.indexData=this.getView().getModel("mLst").getProperty('/manufacturer');
			let index=this.indexData[this.indexData.length-1].id.substr(2)
			let indexInt=Number(index)+1;
			indexInt="mn"+indexInt
			this.start_id='mn'+this.start_id
			this.getView().getModel("mLst").getProperty("/manufacturer").push({   
			"id":indexInt,
            "Name":"",
            "Fname":"",
            "Lname":"",
            "Phno":"",
            "Email":"",
            "typeOfProduct":"",
            "Items":[
            ],
            "Address":"",
            "Branches":[
            ],
            "Outlets":[
            ]

        })
			this.getView().getModel("mLst").refresh();
			let product=this.getView().getModel("mLst").getProperty('/manufacturer').length-1
			this.oRouter.navTo("detail", {layout: fioriLibrary.LayoutType.TwoColumnsMidExpanded, product: product,AoD:"A"});
		},

		onSort: function () {
			this._bDescendingSort = !this._bDescendingSort;
			var oBinding = this.oProductsTable.getBinding("items"),
				oSorter = new Sorter("id", this._bDescendingSort);

			oBinding.sort(oSorter);
        },
        
        onListItemPress: function (oEvent) {
			var productPath = oEvent.getSource().getBindingContext("mLst").getPath(),
				product = productPath.split("/").slice(-1).pop();

			this.oRouter.navTo("detail", {layout: fioriLibrary.LayoutType.TwoColumnsMidExpanded, product: product,AoD:"D"});
		}
	});
});
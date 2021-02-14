sap.ui.define([
	"sap/ui/model/json/JSONModel",
	"sap/ui/core/mvc/Controller",
	'sap/f/library',
	"sap/m/MessageBox"
], function (JSONModel, Controller,fioriLibrary,MessageBox) {
	"use strict";

	return Controller.extend("sap.ui.demo.fiori2.controller.DetailDetail", {
		onInit: function () {
			var oOwnerComponent = this.getOwnerComponent();

			this.oRouter = oOwnerComponent.getRouter();
			this.oModel = oOwnerComponent.getModel();

			this.oRouter.getRoute("detailDetail").attachPatternMatched(this._onPatternMatch, this);
		},

		_onPatternMatch: function (oEvent) {
			this._supplier = oEvent.getParameter("arguments").supplier || this._supplier || "0";
			this._product = oEvent.getParameter("arguments").product || this._product || "0";
			this._IoB=oEvent.getParameter("arguments").IoB || this._IoB || "I";
			if(this._IoB=="I"){
				this.byId("branchDetail").setVisible(false)
				this.byId("branchEdit").setVisible(false)
				this.byId("outletDetail").setVisible(false)
				this.byId("outletEdit").setVisible(false)
				this.byId("itemEdit").setVisible(false)
				this.byId("itemDetail").setVisible(true)
				this.getView().bindElement({
					path: "/manufacturer/" + this._product+"/Items/"+this._supplier,
					model: "mLst"
				});
			}
			else if(this._IoB=="B"){
				this.byId("branchDetail").setVisible(true)
				this.byId("branchEdit").setVisible(false)
				this.byId("outletDetail").setVisible(false)
				this.byId("outletEdit").setVisible(false)
				this.byId("itemEdit").setVisible(false)
				this.byId("itemDetail").setVisible(false)
				this.getView().bindElement({
					path: "/manufacturer/" + this._product+"/Branches/"+this._supplier,
					model: "mLst"
				});
			}
			else if(this._IoB=="O"){
				this.byId("branchDetail").setVisible(false)
				this.byId("branchEdit").setVisible(false)
				this.byId("outletDetail").setVisible(true)
				this.byId("outletEdit").setVisible(false)
				this.byId("itemEdit").setVisible(false)
				this.byId("itemDetail").setVisible(false)
				this.getView().bindElement({
					path: "/manufacturer/" + this._product+"/Outlets/"+this._supplier,
					model: "mLst"
				});
			}
			else if(this._IoB=="IA"){
				this.byId("branchDetail").setVisible(false)
				this.byId("branchEdit").setVisible(false)
				this.byId("outletDetail").setVisible(false)
				this.byId("outletEdit").setVisible(false)
				this.byId("itemEdit").setVisible(true)
				this.byId("itemDetail").setVisible(false)
				console.log(this.getView().getModel('mLst').getProperty("/manufacturer/" + this._product+"/Items/"+this._supplier))
				this.getView().bindElement({
					path: "/manufacturer/" + this._product+"/Items/"+this._supplier,
					model: "mLst"
				});
			}
			else if(this._IoB=="BA"){
				this.byId("branchDetail").setVisible(false)
				this.byId("branchEdit").setVisible(true)
				this.byId("outletDetail").setVisible(false)
				this.byId("outletEdit").setVisible(false)
				this.byId("itemEdit").setVisible(false)
				this.byId("itemDetail").setVisible(false)
				this.getView().bindElement({
					path: "/manufacturer/" + this._product+"/Branches/"+this._supplier,
					model: "mLst"
				});
			}
			else if(this._IoB=="OA"){
				this.byId("branchDetail").setVisible(false)
				this.byId("branchEdit").setVisible(false)
				this.byId("outletDetail").setVisible(false)
				this.byId("outletEdit").setVisible(true)
				this.byId("itemEdit").setVisible(false)
				this.byId("itemDetail").setVisible(false)
				this.getView().bindElement({
					path: "/manufacturer/" + this._product+"/Outlets/"+this._supplier,
					model: "mLst"
				});
			}
			
			
		},

		onEditPress:function(){
			if(this._IoB=="I"){
				this._data=Object.assign({},this.getView().getModel('mLst').getProperty("/manufacturer/" + this._product+"/Items/"+this._supplier))
				this.byId("branchDetail").setVisible(false)
				this.byId("branchEdit").setVisible(false)
				this.byId("outletDetail").setVisible(false)
				this.byId("outletEdit").setVisible(false)
				this.byId("itemEdit").setVisible(true)
				this.byId("itemDetail").setVisible(false)
				this.getView().bindElement({
					path: "/manufacturer/" + this._product+"/Items/"+this._supplier,
					model: "mLst"
				});
			}
			else if(this._IoB=="B"){
				this._data=Object.assign({},this.getView().getModel('mLst').getProperty("/manufacturer/" + this._product+"/Branches/"+this._supplier))
				this.byId("branchDetail").setVisible(false)
				this.byId("branchEdit").setVisible(true)
				this.byId("outletDetail").setVisible(false)
				this.byId("outletEdit").setVisible(false)
				this.byId("itemEdit").setVisible(false)
				this.byId("itemDetail").setVisible(false)
				this.getView().bindElement({
					path: "/manufacturer/" + this._product+"/Branches/"+this._supplier,
					model: "mLst"
				});
			}
			else if(this._IoB=="O"){
				this._data=Object.assign({},this.getView().getModel('mLst').getProperty("/manufacturer/" + this._product+"/Outlets/"+this._supplier))
				this.byId("branchDetail").setVisible(false)
				this.byId("branchEdit").setVisible(false)
				this.byId("outletDetail").setVisible(false)
				this.byId("outletEdit").setVisible(true)
				this.byId("itemEdit").setVisible(false)
				this.byId("itemDetail").setVisible(false)
				this.getView().bindElement({
					path: "/manufacturer/" + this._product+"/Outlets/"+this._supplier,
					model: "mLst"
				});
			}
		},

		backBtn:function(){
			this.oRouter.navTo("detail", {layout: fioriLibrary.LayoutType.TwoColumnsMidExpanded, product: this._product,AoD:"D"});
		},

		onItemSave:function(){
			var oView = this.getView()
			var aInputs=[
				oView.byId("itemitem"),
				oView.byId("itemmodel")
				]
				var bValidationError = false;

			// Check that inputs are not empty.
			// Validation does not happen during data binding as this is only triggered by user actions.
			aInputs.forEach(function (oInput) {
				bValidationError = this._validateInput(oInput) || bValidationError;
			}, this);
			if (!bValidationError) {
				this.byId("branchDetail").setVisible(false)
				this.byId("branchEdit").setVisible(false)
				this.byId("outletDetail").setVisible(false)
				this.byId("outletEdit").setVisible(false)
				this.byId("itemEdit").setVisible(false)
				this.byId("itemDetail").setVisible(true)
			}
			else {
				MessageBox.alert("A validation error has occurred. Complete your input first.");
			}	
		},

		onItemCancel:function(){
			if(this._IoB=='IA'){	
				this.getView().getModel("mLst").getProperty("/manufacturer/"+this._product+"/Items").splice(this._supplier, 1);
				this.getView().getModel("mLst").refresh();
				this.oRouter.navTo("detail", {layout: fioriLibrary.LayoutType.TwoColumnsMidExpanded, product: this._product,AoD:"D"});
			}
			else{
				//restore data
				this.getView().getModel('mLst').setProperty(this.byId('itemEdit').getBindingContext('mLst').sPath,this._data)
				this.onItemSave()				
			}
		},

		onBranchSave:function(){
			var oView = this.getView()
			var aInputs=[
				oView.byId("branchplace")
				]
				var bValidationError = false;

			// Check that inputs are not empty.
			// Validation does not happen during data binding as this is only triggered by user actions.
			aInputs.forEach(function (oInput) {
				bValidationError = this._validateInput(oInput) || bValidationError;
			}, this);
			if (!bValidationError) {
			this.byId("branchDetail").setVisible(true)
			this.byId("branchEdit").setVisible(false)
			this.byId("outletDetail").setVisible(false)
			this.byId("outletEdit").setVisible(false)
			this.byId("itemEdit").setVisible(false)
			this.byId("itemDetail").setVisible(false)
			}
			else {
				MessageBox.alert("A validation error has occurred. Complete your input first.");
			}
		},

		onBranchCancell:function(){
			if(this._IoB=='BA'){
				this.getView().getModel("mLst").getProperty("/manufacturer/"+this._product+"/Branches").splice(this._supplier, 1);
				this.getView().getModel("mLst").refresh();
				this.oRouter.navTo("detail", {layout: fioriLibrary.LayoutType.TwoColumnsMidExpanded, product: this._product,AoD:"D"});
			}
			else{
				this.getView().getModel('mLst').setProperty(this.byId('branchEdit').getBindingContext('mLst').sPath,this._data)
				this.onBranchSave()
			}
		},

		onOutletSave:function(){
			var oView = this.getView()
			var aInputs=[
				oView.byId("outletname"),
				oView.byId("outletplace")
				]
				var bValidationError = false;

			// Check that inputs are not empty.
			// Validation does not happen during data binding as this is only triggered by user actions.
			aInputs.forEach(function (oInput) {
				bValidationError = this._validateInput(oInput) || bValidationError;
			}, this);
			if (!bValidationError) {
				this.byId("branchDetail").setVisible(false)
				this.byId("branchEdit").setVisible(false)
				this.byId("outletDetail").setVisible(true)
				this.byId("outletEdit").setVisible(false)
				this.byId("itemEdit").setVisible(false)
				this.byId("itemDetail").setVisible(false)
			}
			else {
				MessageBox.alert("A validation error has occurred. Complete your input first.");
			}
		},

		onOutletCancell:function(){
			if(this._IoB=='OA'){
				this.getView().getModel("mLst").getProperty("/manufacturer/"+this._product+"/Outlets").splice(this._supplier, 1);
				this.getView().getModel("mLst").refresh();
				this.oRouter.navTo("detail", {layout: fioriLibrary.LayoutType.TwoColumnsMidExpanded, product: this._product,AoD:"D"});
			}
			else{
				this.getView().getModel('mLst').setProperty(this.byId('outletEdit').getBindingContext('mLst').sPath,this._data)
				this.onOutletSave()
			}
			},
		
			_validateInput: function (oInput) {
				var sValueState = "None";
				var bValidationError = false;
				var oBinding = oInput.getBinding("value");
	
				try {
					oBinding.getType().validateValue(oInput.getValue());
				} catch (oException) {
					sValueState = "Error";
					bValidationError = true;
				}
	
				oInput.setValueState(sValueState);
	
				return bValidationError;
			},
	
			onNameChange: function(oEvent) {
				var oInput = oEvent.getSource();
				this._validateInput(oInput);
			},

		onDeletePress:function(){
			if(this._IoB=="I" || this._IoB=="IA"){
				this.getView().getModel("mLst").getProperty("/manufacturer/"+this._product+"/Items").splice(this._supplier, 1);
			}
			else if(this._IoB=="B" || this._IoB=="BA"){
				this.getView().getModel("mLst").getProperty("/manufacturer/"+this._product+"/Branches").splice(this._supplier, 1);
			}
			else if(this._IoB=="O" || this._IoB=="OA"){
				this.getView().getModel("mLst").getProperty("/manufacturer/"+this._product+"/Outlets").splice(this._supplier, 1);
			}
			this.getView().getModel("mLst").refresh();
			this.oRouter.navTo("detail", {layout: fioriLibrary.LayoutType.TwoColumnsMidExpanded, product: this._product,AoD:"D"});
		},

		onExit: function () {
			this.oRouter.getRoute("detailDetail").detachPatternMatched(this._onPatternMatch, this);
		}

		
	});
});
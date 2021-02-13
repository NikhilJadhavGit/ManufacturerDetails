sap.ui.define([
	"sap/ui/core/mvc/Controller",
	'sap/f/library',
	"sap/ui/model/SimpleType",
	"sap/m/MessageBox",
	"sap/ui/model/ValidateException",
], function (Controller, fioriLibrary,SimpleType,MessageBox, ValidateException) {
	"use strict";

	return Controller.extend("sap.ui.demo.fiori2.controller.Detail", {
		onInit: function () {
			var oOwnerComponent = this.getOwnerComponent();

			this.oRouter = oOwnerComponent.getRouter();
			this.oModel = oOwnerComponent.getModel();

			this.oRouter.getRoute("master").attachPatternMatched(this._onProductMatched, this);
			this.oRouter.getRoute("detail").attachPatternMatched(this._onProductMatched, this);
			this.oRouter.getRoute("detailDetail").attachPatternMatched(this._onProductMatched, this);
		},

		onItemPress: function (oEvent) {
			var supplierPath = oEvent.getSource().getBindingContext("mLst").getPath(),
				supplier = supplierPath.split("/").slice(-1).pop();

			this.oRouter.navTo("detailDetail", {layout: fioriLibrary.LayoutType.ThreeColumnsMidExpanded, supplier: supplier, product: this._product,IoB: "I"});
		},
		onBranchPress: function (oEvent) {
			var supplierPath = oEvent.getSource().getBindingContext("mLst").getPath(),
				supplier = supplierPath.split("/").slice(-1).pop();

			this.oRouter.navTo("detailDetail", {layout: fioriLibrary.LayoutType.ThreeColumnsMidExpanded, supplier: supplier, product: this._product,IoB: "B"});
		},
		onOutletPress: function (oEvent) {
			var supplierPath = oEvent.getSource().getBindingContext("mLst").getPath(),
				supplier = supplierPath.split("/").slice(-1).pop();

			this.oRouter.navTo("detailDetail", {layout: fioriLibrary.LayoutType.ThreeColumnsMidExpanded, supplier: supplier, product: this._product,IoB: "O"});
		},
		_onProductMatched: function (oEvent) {
			var oObjectPage = this.getView().byId("ObjectPageLayout"),
			bCurrentShowFooterState = oObjectPage.getShowFooter();
			this._product = oEvent.getParameter("arguments").product || this._product || "0";
			this._AoD=oEvent.getParameter("arguments").AoD
			if(this._AoD=="A"){
					this.byId("editBtn").setEnabled(false)
					this.byId("infoDetail").setVisible(false)
					this.byId('infoEdit').setVisible(false)
					this.byId('infoAdd').setVisible(true)
					oObjectPage.setShowFooter(!bCurrentShowFooterState);
			}
			else if(this._AoD=="D"){
					this.byId("editBtn").setEnabled(true)
					this.byId("infoDetail").setVisible(true)
					this.byId('infoEdit').setVisible(false)
					this.byId('infoAdd').setVisible(false)
			}
			this.getView().bindElement({
				path: "/manufacturer/" + this._product,
				model: "mLst"
			});
        },
		//Buttons
		
		onEditToggleButtonPress: function() {
			var oObjectPage = this.getView().byId("ObjectPageLayout"),
				bCurrentShowFooterState = oObjectPage.getShowFooter();
			oObjectPage.setShowFooter(!bCurrentShowFooterState);
			//disable the edit button
			this.byId("editBtn").setEnabled(false)
			this.byId("backBtn").setEnabled(false)
			//show the form and hide the detail
			this.byId("infoDetail").setVisible(false)
			this.byId('infoEdit').setVisible(true)
			//clone the values
			this._formarValues= Object.assign({},this.getView().getModel('mLst').getProperty(this.byId('infoEdit').getBindingContext('mLst').sPath))
		},

		back:function(){
			this.oRouter.navTo("master");
		},

		onDeleteBtnPress:function(){
			this.getView().getModel("mLst").getProperty("/manufacturer").splice(this._product, 1);
			this.getView().getModel("mLst").refresh();
			this.oRouter.navTo("master");

		},

		onSavePress: function() {
			
			var oView = this.getView()
			var aInputs=[]
			if(this._AoD=="D"){
				aInputs = [
					oView.byId("efname"),
					oView.byId("elname"),
					oView.byId("ephoneno"),
					oView.byId("eemail"),
					oView.byId("eaddress")
					]
			}
			else if(this._AoD=="A"){
				aInputs = [
					oView.byId("aname"),
					oView.byId("aproducttype"),
					oView.byId("afname"),
					oView.byId("alname"),
					oView.byId("aphoneno"),
					oView.byId("aemail"),
					oView.byId("aaddress")
					]
			}
			var bValidationError = false;

			// Check that inputs are not empty.
			// Validation does not happen during data binding as this is only triggered by user actions.
			aInputs.forEach(function (oInput) {
				bValidationError = this._validateInput(oInput) || bValidationError;
			}, this);

			if (!bValidationError) {
					var oObjectPage = this.getView().byId("ObjectPageLayout"),
					bCurrentShowFooterState = oObjectPage.getShowFooter();
					oObjectPage.setShowFooter(!bCurrentShowFooterState);
					//enable the edit button
					this.byId("editBtn").setEnabled(true)
					this.byId("backBtn").setEnabled(true)
					//hide the form and show the detail
					this.byId("infoDetail").setVisible(true)
					this.byId('infoEdit').setVisible(false)
					this.byId('infoAdd').setVisible(false)
					this._AoD="D"
				} 
			else {
					MessageBox.alert("A validation error has occurred. Complete your input first.");
				}	
		},

		onCancelPress: function() {
			var oObjectPage = this.getView().byId("ObjectPageLayout"),
			bCurrentShowFooterState = oObjectPage.getShowFooter();
			oObjectPage.setShowFooter(!bCurrentShowFooterState);
			//enable the edit button
			this.byId("editBtn").setEnabled(true)
			this.byId("backBtn").setEnabled(true)
			//hide the form and show the detail
			this.byId("infoDetail").setVisible(true)
			this.byId('infoEdit').setVisible(false)
			this.byId('infoAdd').setVisible(false)
			if(this._AoD=="A"){
				this.getView().getModel("mLst").getProperty("/manufacturer").splice(this._product, 1);
				this.getView().getModel("mLst").refresh();
				this.oRouter.navTo("master");
			}
			else{
			//restore the values
			this.getView().getModel('mLst').setProperty(this.byId('infoEdit').getBindingContext('mLst').sPath,this._formarValues)
			}
		},

		//detail-detail btns
		itemAdd:function(oEvent){
			var supplierPath = oEvent.getSource().getBindingContext("mLst").getPath(),
			supplier = this.getView().getModel('mLst').getProperty(supplierPath+"/Items").length
			this.getView().getModel('mLst').getProperty(supplierPath+"/Items").push(
				{
					"id":"temp_id",
                    "item":"",
                    "model":""
					
				})
			this.getView().getModel('mLst').refresh()
			this.oRouter.navTo("detailDetail", {layout: fioriLibrary.LayoutType.ThreeColumnsMidExpanded, supplier: supplier, product: this._product,IoB: "IA"});
		},

		branchAdd:function(oEvent){
			var supplierPath = oEvent.getSource().getBindingContext("mLst").getPath(),
			supplier = this.getView().getModel('mLst').getProperty(supplierPath+"/Branches").length
			this.getView().getModel('mLst').getProperty(supplierPath+"/Branches").push(
				{
					"id":"temp_id",
                    "place":""
					
				})
			this.getView().getModel('mLst').refresh()
			this.oRouter.navTo("detailDetail", {layout: fioriLibrary.LayoutType.ThreeColumnsMidExpanded, supplier: supplier, product: this._product,IoB: "BA"});
		},

		outletAdd:function(oEvent){
			var supplierPath = oEvent.getSource().getBindingContext("mLst").getPath(),
			supplier = this.getView().getModel('mLst').getProperty(supplierPath+"/Outlets").length
			this.getView().getModel('mLst').getProperty(supplierPath+"/Outlets").push(
				{
					"id":"temp_id",
					"Name":"",
                    "place":""
					
				})
			this.getView().getModel('mLst').refresh()
			this.oRouter.navTo("detailDetail", {layout: fioriLibrary.LayoutType.ThreeColumnsMidExpanded, supplier: supplier, product: this._product,IoB: "OA"});
		},

		//validation
		validate:function(){
			var email = this.getView().byId("emailInput").getValue();
			var mailregex = /^\w+[\w-+\.]*\@\w+([-\.]\w+)*\.[a-zA-Z]{2,}$/;
			if (!mailregex.test(email)) {
					alert(email + " is not a valid email address");
					this.getView().byId("emailInput").setValueState(sap.ui.core.ValueState.Error);
			}
			else{
				this.getView().byId("emailInput").setValueState(sap.ui.core.ValueState.Success);
			}
		},

		
		onExit: function () {
			this.oRouter.getRoute("master").detachPatternMatched(this._onProductMatched, this);
			this.oRouter.getRoute("detail").detachPatternMatched(this._onProductMatched, this);
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

		//custom datatype
		customEMailType: SimpleType.extend("email", {
			formatValue: function (oValue) {
				return oValue;
			},

			parseValue: function (oValue) {
				//parsing step takes place before validating step, value could be altered here
				return oValue;
			},

			validateValue: function (oValue) {
				// The following Regex is only used for demonstration purposes and does not cover all variations of email addresses.
				// It's always better to validate an address by simply sending an e-mail to it.
				var rexMail = /^\w+[\w-+\.]*\@\w+([-\.]\w+)*\.[a-zA-Z]{2,}$/;
				if (!oValue.match(rexMail)) {
					throw new ValidateException("'" + oValue + "' is not a valid e-mail address");
				}
			}
		}),
		customPhoneType: SimpleType.extend("phone", {
			formatValue: function (oValue) {
				return oValue;
			},

			parseValue: function (oValue) {
				//parsing step takes place before validating step, value could be altered here
				return oValue;
			},

			validateValue: function (oValue) {
				// The following Regex is only used for demonstration purposes and does not cover all variations of email addresses.
				// It's always better to validate an address by simply sending an e-mail to it.
				var rexPhno = /^\d{10}$/;
				if (!oValue.match(rexPhno)) {
					throw new ValidateException("'" + oValue + "' is not a valid Phone no");
				}
			}
		})
	});
});
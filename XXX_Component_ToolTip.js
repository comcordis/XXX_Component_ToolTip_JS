
var XXX_Component_ToolTip =
{
	visible: false,
	
	nextTo: 'element',
	spacing: 0,
	
	preferredPositions: ['topLeft'],
	
	pointerPosition:
	{
		x: 0,
		y: 0
	},
		
	hideDelayID: false,
	
	elements: {},
	
	initialize: function ()
	{
			this.elements.toolTip = XXX_DOM.createElementNode('div');
			this.elements.toolTip.id = 'XXX_Component_ToolTip';
			XXX_CSS.setClass(this.elements.toolTip, 'XXX_Component_ToolTip');
			
		XXX_DOM.appendChildNode(XXX_DOM.getBody(), this.elements.toolTip);
		
		
		var tempFunction = function ()
		{
			XXX_Component_ToolTip.viewPortChange();
		};
		
		XXX_Manager_Page.addEventListener('viewPortChange', tempFunction);
		
		
		var tempFunction2 = function ()
		{
			XXX_Component_ToolTip.mouseMove();
		};
		
		XXX_Manager_Page.addEventListener('mouseMove', tempFunction2);
		
		
		// TODO if touch, more distance, above or besides, if mouse: less distance, above or below
	},
	
	viewPortChange: function ()
	{
		if (this.visible)
		{
			this.resize();
			this.updatePosition();
		}
	},
	
	mouseMove: function ()
	{
		if (this.visible)
		{
			var mousePosition = XXX_Manager_Page.getMousePositionWithinViewPort();
			var viewPortPosition = XXX_Manager_Page.getViewPortPosition();
			
			this.pointerPosition.x = viewPortPosition.x + mousePosition.x;
			this.pointerPosition.y = viewPortPosition.y + mousePosition.y;
			
			this.updatePosition();
		}
	},
	
	resize: function ()
	{
		if (this.visible)
		{
			var viewPortSize = XXX_Manager_Page.getViewPortSize();
			
			if (viewPortSize.width)
			{
				//XXX_CSS.setStyle(this.elements.toolTip, 'width', viewPortSize.width + 'px');
			}
		}
	},
	
	setBody: function (content)
	{
		XXX_DOM.setContent(this.elements.toolTip, content);
	},
	
	clearBody: function (content)
	{
		XXX_DOM.removeChildNodes(this.elements.toolTip);
	},
		
	getBodyElement: function ()
	{
		this.elements.toolTip;
	},
	
	
	updatePosition: function ()
	{
		if (this.visible)
		{
			switch (this.nextTo)
			{
				case 'element':
					if (this.elements.offsetElement)
					{
						XXX_CSS_Position.nextToOffsetElement(this.elements.offsetElement, this.elements.toolTip, this.preferredPositions, this.spacing);
					}
					break;
				case 'pointer':
					XXX_CSS_Position.nextToCoordinate(this.pointerPosition, this.elements.toolTip, this.preferredPositions, this.spacing);
					break;
			}
		}
	},
	
	positionNextToElement: function (offsetElement, preferredPositions, spacing)
	{
		this.nextTo = 'element';
		this.elements.offsetElement = offsetElement;
		this.preferredPositions = preferredPositions;
		this.spacing = spacing;
		
		this.updatePosition();
	},
	
	positionNextToPointer: function (preferredPositions, spacing)
	{
		this.nextTo = 'pointer';
		this.preferredPositions = preferredPositions;
		this.spacing = spacing;
		
		this.updatePosition();
	},
	
	show: function ()
	{
		if (!this.visible)
		{		
			this.visible = true;
			
			XXX_CSS_Visibility.expand(this.elements.toolTip);
			
			XXX_CSS_Depth.bringToFront(this.elements.toolTip);
			
			//this.resize();
		}
	},
	
	hide: function ()
	{
		if (this.visible)
		{		
			XXX_CSS_Visibility.collapse(this.elements.toolTip);
			
			this.visible = false;
		}
	},
	
	hideDelayed: function (delay)
	{
		delay = XXX_Default.toPositiveInteger(delay, 5000);
	
		this.hideDelayID = XXX_Timer.startDelay(delay, function ()
		{
			XXX_Component_ToolTip.hide();
		});
	}
};

XXX_DOM_Ready.addEventListener(function ()
{
	XXX_Component_ToolTip.initialize();
});
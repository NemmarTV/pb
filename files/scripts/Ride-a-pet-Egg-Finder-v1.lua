--[[ Ride a pet Egg Finder v1 | Rose ]]
local a=loadstring(game:HttpGet("https://raw.githubusercontent.com/Knuxy92/Ui-linoria/main/Fluent/Fluent.lua"))()
local b=loadstring(game:HttpGet("https://raw.githubusercontent.com/dawid-scripts/Fluent/master/Addons/SaveManager.lua"))()
local c=loadstring(game:HttpGet("https://raw.githubusercontent.com/dawid-scripts/Fluent/master/Addons/InterfaceManager.lua"))()
local d=game:GetService("Players")
local e=d.LocalPlayer
local f=a:CreateWindow({Title="Ride a pet Egg Finder v1",SubTitle="Rose Theme",TabWidth=160,Size=UDim2.fromOffset(520,480),Acrylic=false,Theme="Rose",MinimizeKey=Enum.KeyCode.LeftControl})
local g={Main=f:AddTab({Title="Egg ESP",Icon="egg"}),Player=f:AddTab({Title="Player",Icon="user"}),Teleport=f:AddTab({Title="Teleport",Icon="map-pin"}),Settings=f:AddTab({Title="Settings",Icon="settings"})}
local h=a.Options
local i,j,k,l,m,n=false,false,true,true,99999,15
local o,p,q,r=false,16,50,false
local s,t={},{}
local function u(v)if not v then return false end;local w=string.lower(v.Name)if string.find(w,"base")or string.find(w,"stand")or string.find(w,"platform")or string.find(w,"nest")then return false end;if v:IsA("Model")and string.find(w,"egg")then return true end;return false end
local function x(v)if v:IsA("Model")then return v.PrimaryPart or v:FindFirstChildWhichIsA("BasePart")or v:FindFirstChildWhichIsA("MeshPart")end;return v end
local function y(v)if s[v]then for _,z in pairs(s[v])do if typeof(z)=="Instance"then pcall(function()z:Destroy()end)end end;s[v]=nil end end
local function A(B)if t[B]then for _,z in pairs(t[B])do if typeof(z)=="Instance"then pcall(function()z:Destroy()end)end end;t[B]=nil end end
local function C(v)if s[v]then return end;local D=x(v)if not D then return end
local E=Instance.new("BillboardGui")E.Name="EggESP"E.Adornee=D;E.Size=UDim2.new(0,180,0,42)E.StudsOffset=Vector3.new(0,3.4,0)E.AlwaysOnTop=true;E.MaxDistance=99999;E.Parent=D
local F=Instance.new("TextLabel")F.Name="Name"F.Size=UDim2.new(1,0,0.55,0)F.BackgroundTransparency=1;F.Text=v.Name;F.TextColor3=Color3.fromRGB(255,180,200)F.TextStrokeTransparency=0.25;F.TextSize=n;F.Font=Enum.Font.GothamBold;F.Parent=E
local G=Instance.new("TextLabel")G.Name="Distance"G.Size=UDim2.new(1,0,0.45,0)G.Position=UDim2.new(0,0,0.55,0)G.BackgroundTransparency=1;G.Text=""G.TextColor3=Color3.fromRGB(255,220,230)G.TextStrokeTransparency=0.25;G.TextSize=n-2;G.Font=Enum.Font.Gotham;G.Parent=E
s[v]={Billboard=E,NameLabel=F,DistLabel=G,Root=D}end
local function H(B)if B==e or t[B]then return end;local I=B.Character;if not I then return end;local J=I:FindFirstChild("HumanoidRootPart")if not J then return end
local E=Instance.new("BillboardGui")E.Name="PlayerESP"E.Adornee=J;E.Size=UDim2.new(0,160,0,36)E.StudsOffset=Vector3.new(0,3,0)E.AlwaysOnTop=true;E.MaxDistance=99999;E.Parent=J
local F=Instance.new("TextLabel")F.Size=UDim2.new(1,0,0.6,0)F.BackgroundTransparency=1;F.Text=B.DisplayName;F.TextColor3=Color3.fromRGB(255,160,190)F.TextStrokeTransparency=0.3;F.TextSize=14;F.Font=Enum.Font.GothamBold;F.Parent=E
local G=Instance.new("TextLabel")G.Size=UDim2.new(1,0,0.4,0)G.Position=UDim2.new(0,0,0.6,0)G.BackgroundTransparency=1;G.Text=""G.TextColor3=Color3.fromRGB(220,200,210)G.TextStrokeTransparency=0.3;G.TextSize=12;G.Font=Enum.Font.Gotham;G.Parent=E
t[B]={Billboard=E,NameLabel=F,DistLabel=G,Root=J}end
local function K()local I=e.Character;local J=I and I:FindFirstChild("HumanoidRootPart")if not J then return end
if i then for v,L in pairs(s)do if not v or not v.Parent then y(v)else local D=L.Root;if D and D.Parent then local M=(J.Position-D.Position).Magnitude;L.Billboard.Enabled=true;L.NameLabel.Visible=k;L.DistLabel.Visible=l;if l then L.DistLabel.Text=string.format("%d studs",math.floor(M))end end end end end
if j then for B,L in pairs(t)do if not B.Parent or not B.Character or not L.Root or not L.Root.Parent then A(B)else local M=(J.Position-L.Root.Position).Magnitude;L.DistLabel.Text=string.format("%d studs",math.floor(M))end end end end
local function N()if not i then return end;for _,v in ipairs(workspace:GetDescendants())do if u(v)then C(v)end end end
local function O()if not j then return end;for _,B in ipairs(d:GetPlayers())do if B~=e then H(B)end end end
local function P(Q)local I=e.Character;local J=I and I:FindFirstChild("HumanoidRootPart")if not J then return false end;J.CFrame=CFrame.new(Q+Vector3.new(0,5,0))return true end
local function R(v)if not v then return false end;local w=string.lower(v.Name)return string.find(w,"blackhole")or string.find(w,"black hole")or string.find(w,"cherub")or string.find(w,"solaris")end
local function S()local T,U=nil,math.huge;local J=e.Character and e.Character:FindFirstChild("HumanoidRootPart")
for _,v in ipairs(workspace:GetDescendants())do if R(v)then local D=x(v)if D then local M=J and(J.Position-D.Position).Magnitude or 0;if M<U then U=M;T=D end end end end;return T end
local function V()for _,v in ipairs(workspace:GetDescendants())do if v:IsA("Model")or v:IsA("Folder")then local w=string.lower(v.Name)if string.find(w,string.lower(e.Name))or string.find(w,"plot")or string.find(w,"base")or string.find(w,"farm")then local W=v:FindFirstChildWhichIsA("BasePart")or v.PrimaryPart;if W then return W end end end end
local X={workspace:FindFirstChild("Plots"),workspace:FindFirstChild("Farms"),workspace:FindFirstChild("Bases"),workspace:FindFirstChild("Tycoons")}
for _,Y in pairs(X)do if Y then local Z=Y:FindFirstChild(e.Name)or Y:FindFirstChild(tostring(e.UserId))if Z then local W=Z:FindFirstChildWhichIsA("BasePart")or Z.PrimaryPart;if W then return W end end end end;return nil end
local function aa()local I=e.Character;local ab=I and I:FindFirstChildOfClass("Humanoid")if not ab then return end;if o then ab.WalkSpeed=p;ab.JumpPower=q else ab.WalkSpeed=16;ab.JumpPower=50 end end
game:GetService("UserInputService").JumpRequest:Connect(function()if r then local ab=e.Character and e.Character:FindFirstChildOfClass("Humanoid")if ab then ab:ChangeState(Enum.HumanoidStateType.Jumping)end end end)
e.CharacterAdded:Connect(function()task.wait(0.6)aa()end)
task.spawn(function()while true do if o then aa()end;task.wait(0.3)end end)
g.Main:AddParagraph({Title="Egg ESP",Content="Clean labels that work at any distance."})
g.Main:AddToggle("ESPEnabled",{Title="Enable Egg ESP",Default=false,Callback=function(ac)i=ac;if not ac then for v in pairs(s)do y(v)end else N()end end})
g.Main:AddToggle("ShowName",{Title="Show Egg Name",Default=true,Callback=function(ac)k=ac end})
g.Main:AddToggle("ShowDistance",{Title="Show Distance",Default=true,Callback=function(ac)l=ac end})
g.Main:AddButton({Title="Force Rescan Eggs",Callback=function()for v in pairs(s)do y(v)end;if i then N()a:Notify({Title="Egg Finder",Content="Rescanned!",Duration=2})end end})
g.Main:AddButton({Title="Clear All Egg ESP",Callback=function()for v in pairs(s)do y(v)end;a:Notify({Title="Egg Finder",Content="Cleared",Duration=2})end})
g.Main:AddParagraph({Title="Player ESP",Content="Shows other players + distance."})
g.Main:AddToggle("PlayerESPEnabled",{Title="Enable Player ESP",Default=false,Callback=function(ac)j=ac;if not ac then for B in pairs(t)do A(B)end else O()end end})
g.Player:AddParagraph({Title="Movement",Content="Speed (Max 600)"})
g.Player:AddToggle("SpeedEnabled",{Title="Enable Speed",Default=false,Callback=function(ac)o=ac;aa()a:Notify({Title="Speed",Content=ac and"Enabled"or"Disabled",Duration=2})end})
g.Player:AddSlider("WalkSpeed",{Title="WalkSpeed",Default=16,Min=16,Max=600,Rounding=0,Callback=function(ac)p=ac;if o then aa()end end})
g.Player:AddSlider("JumpPower",{Title="JumpPower",Default=50,Min=50,Max=300,Rounding=0,Callback=function(ac)q=ac;if o then aa()end end})
g.Player:AddToggle("InfiniteJump",{Title="Infinite Jump",Default=false,Callback=function(ac)r=ac end})
g.Player:AddButton({Title="Reset Speed",Callback=function()p=16;q=50;h.WalkSpeed:SetValue(16)h.JumpPower:SetValue(50)aa()end})
g.Teleport:AddParagraph({Title="Teleports",Content="Quick travel"})
g.Teleport:AddButton({Title="TP to Blackhole / Cherub Egg",Callback=function()local T=S()if T and P(T.Position)then a:Notify({Title="Teleport",Content="Teleported to rare egg!",Duration=3})else a:Notify({Title="Teleport",Content="No Blackhole/Cherub/Solaris found",Duration=3})end end})
g.Teleport:AddButton({Title="TP to My Base",Callback=function()local W=V()if W and P(W.Position)then a:Notify({Title="Teleport",Content="Teleported to Base",Duration=3})else local ad=workspace:FindFirstChild("SpawnLocation")or workspace:FindFirstChildWhichIsA("SpawnLocation")if ad then P(ad.Position)a:Notify({Title="Teleport",Content="Teleported to Spawn",Duration=3})else a:Notify({Title="Teleport",Content="Base not found",Duration=3})end end end})
g.Teleport:AddButton({Title="TP to Nearest Egg",Callback=function()local T,U=nil,math.huge;local J=e.Character and e.Character:FindFirstChild("HumanoidRootPart")if not J then return end
for _,v in ipairs(workspace:GetDescendants())do if u(v)then local D=x(v)if D then local M=(J.Position-D.Position).Magnitude;if M<U then U=M;T=D end end end end
if T then P(T.Position)a:Notify({Title="Teleport",Content="Teleported to nearest egg",Duration=3})else a:Notify({Title="Teleport",Content="No eggs found",Duration=3})end end})
g.Settings:AddSlider("TextSize",{Title="Text Size",Default=15,Min=11,Max=22,Rounding=0,Callback=function(ac)n=ac;for _,L in pairs(s)do if L.NameLabel then L.NameLabel.TextSize=ac end;if L.DistLabel then L.DistLabel.TextSize=ac-2 end end end})
task.spawn(function()while true do if i then N()end;if j then O()end;K()task.wait(1.2)end end)
d.PlayerRemoving:Connect(function(B)A(B)end)
workspace.DescendantRemoving:Connect(function(v)if s[v]then y(v)end end)
b:SetLibrary(a)c:SetLibrary(a)b:IgnoreThemeSettings()c:SetFolder("RideAPetEggFinderV1")b:SetFolder("RideAPetEggFinderV1/Configs")c:BuildInterfaceSection(g.Settings)b:BuildConfigSection(g.Settings)
f:SelectTab(1)
a:Notify({Title="Ride a pet Egg Finder v1",Content="Loaded!\n• Rose Theme\n• Full distance ESP\n• Player ESP + Speed + Teleports",Duration=6})
b:LoadAutoloadConfig()
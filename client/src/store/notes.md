## Redux Notes 
##### W.R. 8.24.2020 (please chime in if you guys have ideas!)
****

Q: Which pieces of state should we convert to Redux? 

* The four state slices in App are:    
    * navDrawerVisible
    * nodeData
    * searchData
    * savedDataI
* My goal/this plan will be to convert those four into Redux-managed state.
* Smaller pieces of component-specific state can stay where they are. These four are enough.

## Redux steps: 

## For each slice of state we need to:
[ ] Write reducers
[ ] Test reducers (use RGR - Red Green Refactor)
[ ] Write actions
[ ] Action constants (optional)
--> Note: look into the new Redux hooks before doing these last two; they may not be necessary with using hooks instead.
[ ] Wire all the components up
[ ] Have a party